using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Comments
{
    public class CommentModel
    {
        public string Username { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Message { get; set; }
    }
}
