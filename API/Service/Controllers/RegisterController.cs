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
    public class RegisterController : Controller
    {
        private readonly ICommonRepo<Users> _accountRepository;

        public RegisterController(ICommonRepo<Users> accountRepository)
        {
            _accountRepository = accountRepository;
        }
        //Get All
        [HttpGet]
        [Route("getall")]
        public ResponseEntity<Users> Get()
        {
            try
            {
                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Success!", Entity = null, EnityList = _accountRepository.FindAll() };
                // return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Success!", Entity = null, EnityList = _accountRepository.FindAll().Select(x=>x.Password = Decrypt(x.Password)).AsEnumerable() };
                //return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Success!", Entity = null, EnityList = _accountRepository.FindAll().Select(x=>x.Password = AESCryptography.Decrypt(x.Password)).ToList() };
            }
            catch (Exception)
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Error during fetching records!", Entity = null, EnityList = null };
            }

        }
        //Get Id
        [HttpGet]
        public ResponseEntity<Users> GetbyID(ObjectId id)
        {
            try
            {
                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Success!", Entity = null, EnityList = _accountRepository.FindByCondition(x => x.InternalId == id) };
            }
            catch (Exception)
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Error during fetching records!", Entity = null, EnityList = null };
            }
        }
        //MobileNumber Duplication 
        [Route("MobileNumberExists")]
        [HttpPost]
        public ResponseEntity<Users> MobileNumberCheckPost([FromBody]Users userdata)
        {
            IEnumerable<Users> data = _accountRepository.FindByCondition(x => x.Mobile == userdata.Mobile);

            if (data != null && data.Count() > 0)
            {

                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Mobile Number already Exits!", Entity = null, EnityList = null };
            }
            else
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Success!", Entity = null, EnityList = null };
            }
        }
        //Email Duplication 
        [Route("EmailExists")]
        [HttpPost]
        public ResponseEntity<Users> MailIdCheckPost([FromBody]Users userdata)
        {
            IEnumerable<Users> data = _accountRepository.FindByCondition(x => x.Email == userdata.Email);
            if (data != null && data.Count() > 0)
            {
                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Email already Exits!", Entity = null, EnityList = null };
            }
            else
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Success!", Entity = null, EnityList = null };
            }
        }
        // FirstName Duplication 
        [Route("FirstNameExists")]
        [HttpPost]
        public ResponseEntity<Users> FirstNameCheckPost([FromBody]Users userdata)
        {
            IEnumerable<Users> data = _accountRepository.FindByCondition(x => x.FirstName == userdata.FirstName);
            if (data != null && data.Count() > 0)
            {
                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "First Name already Exits!", Entity = null, EnityList = null };
            }
            else
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Success!", Entity = null, EnityList = null };
            }
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

        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "0ram@1234xxxxxxxxxxtttttuuuuuiiiiio";  //we can change the code converstion key as per our requirement, but the decryption key should be same as encryption key    
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
        });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
        //Insertion
        [HttpPost]
        [Route("add")]
        public ResponseEntity<Users> Add([FromBody]Users userdata)
        {
            try
            {
                var password = Encrypt(userdata.Password);
                userdata.Password = password;
                userdata.CreatedDate = DateTime.Now;
                userdata.ModifiedDate = DateTime.Now;
                _accountRepository.Create(userdata);
                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Success!", Entity = null, EnityList = null };
            }
            catch (Exception)
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Error during Inserting records!", Entity = null, EnityList = null };
            }
        }
        //Updation
        [HttpPut]
        [Route("update")]
        public ResponseEntity<Users> update(ObjectId id, [FromBody]Users userdata)
        {
            try
            {
                var update = Builders<Users>.Update
             .Set(it => it.ModifiedDate, DateTime.Now);
                _accountRepository.Update(x => x.InternalId == id, update);
                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Success!", Entity = null, EnityList = null };
            }
            catch (Exception)
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Error during Updating records!", Entity = null, EnityList = null };
            }

        }
        //Deletion
        [HttpPost]
        [Route("delete")]
        public ResponseEntity<Users> delete(ObjectId id)
        {
            try
            {

                _accountRepository.Delete(x => x.InternalId == id);

                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Success!", Entity = null, EnityList = null };
            }
            catch (Exception)
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Error during Deleting records!", Entity = null, EnityList = null };
            }

        }
        //Bulk Insertion
        [HttpPost]
        [Route("bulkinsert")]
        public ResponseEntity<Users> bulkinsert([FromBody]IEnumerable<Users> userdata)
        {
            try
            {
                _accountRepository.BuklkInsert(userdata);

                return new ResponseEntity<Users> { Responsecode = 1, ResponseMessage = "Success!", Entity = null, EnityList = null };
            }
            catch (Exception)
            {
                return new ResponseEntity<Users> { Responsecode = 0, ResponseMessage = "Error during Inserting Bulk records!", Entity = null, EnityList = null };
            }

        }
    }
}

