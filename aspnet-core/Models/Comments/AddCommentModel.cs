using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Comments
{
    public class AddCommentModel
    {
        [Required]
        public string Message { get; set; }
        [Required]
        public int ProfilePhotoId { get; set; }
    }
}
