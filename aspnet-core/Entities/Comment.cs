using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int ProfileId { get; set; }
        public Profile Profile { get; set; }
        public int ProfilePhotoId { get; set; }
        public ProfilePhoto ProfilePhoto { get; set; }
    }
}
