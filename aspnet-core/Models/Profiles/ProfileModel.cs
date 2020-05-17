using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;

namespace WebApi.Models.Profiles
{
    public class ProfileModel
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BannerImageUrl { get; set; }
        public string ProfileImageUrl { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public ICollection<Like> Likes { get; set; }
    }
}
