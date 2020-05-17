using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class ProfilePhoto
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }

        public int ProfileId { get; set; }
        
        public Profile Profile { get; set; }
        //public int Likes { get; set; }
        public ICollection<Like> Likes { get; set; }

    }
}
