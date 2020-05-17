using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
 
    public class Profile
    {
        

        [ForeignKey("User")]
        public int Id { get; set; }

        public string BannerImageUrl { get; set; }
        public string ProfileImageUrl { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }


        public User User { get; set; }
        public ICollection<ProfilePhoto> ProfileImages { get; set; }
        public ICollection<Like> Likes { get; set; }
    }
}
