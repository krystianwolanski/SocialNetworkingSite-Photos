using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Profiles
{
    public class AddPhotoModel
    {
        public String Username { get; set; }
        [FromForm]
        public IFormFile Photo { get; set; }
    }
}
