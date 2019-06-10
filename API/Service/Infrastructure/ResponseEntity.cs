using System;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;
namespace API.Service.Infrastructure
{
    public class ResponseEntity<T>
    {
        public int Responsecode { get; set; }
        public string ResponseMessage { get; set; }
        public T Entity { get; set; }
        public IEnumerable<T> EnityList { get; set; }
    }

}
