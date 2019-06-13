using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using DAL.Interfaces;
using DAL.Model;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver.Linq;
using MongoDB.Driver;
using API.Service.Infrastructure;
using System.Security.Cryptography;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Web;

namespace API.Service.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
         private readonly ICommonRepo<Users> _accountRepository;
          public LoginController(ICommonRepo<Users> accountRepository)
        {
            _accountRepository = accountRepository;
        }
        public static string Encrypt(string encryptString)
        {
            string EncryptionKey = "0ram@1234xxxxxxxxxxtttttuuuuuiiiiio";  //we can change the code converstion key as per our requirement    
            byte[] clearBytes = Encoding.Unicode.GetBytes(encryptString);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
        });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    encryptString = Convert.ToBase64String(ms.ToArray());
                }
            }
            return encryptString;
        }


          //Login
        [HttpPost]
        [Route("Login")]
        public ResponseEntity<Users> Login([FromBody]Users userdata)
        {
            var password = Encrypt(userdata.Password);
            userdata.Password = password;
             IEnumerable<Users> Checklogin = _accountRepository.FindByCondition(x => (x.Email == userdata.Email || x.Mobile == userdata.Mobile) && x.Password == userdata.Password );
            if (Checklogin != null && Checklogin.Count() > 0)
            {
                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "UserName and Password already exitst!", Entity = null, EnityList = null };
            }
            else
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Success!", Entity = null, EnityList = null };
            }
           
        }

    }
}