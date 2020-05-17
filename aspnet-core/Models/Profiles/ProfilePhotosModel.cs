using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebApi.Models.Profiles
{
    public class ProfilePhotosModel
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Username { get; set; }
        public ICollection<Like> Likes { get; set; }

    }
}
