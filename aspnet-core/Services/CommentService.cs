using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
   public interface ICommentService
    {
        IEnumerable<Comment> GetAll();
        IEnumerable<Comment> GetPhotoComments(int PhotoId);
        Comment CreateComment(int UserId, int PhotoId, string message);
    }
    public class CommentService : ICommentService
    {
        private DataContext _context;

        public CommentService(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<Comment> GetAll()
        {
            return _context.Comments;
        }

        public Comment CreateComment(int UserId, int PhotoId, string message)
        {
            Profile profile = _context.Profiles.Single(x => x.Id == UserId);
            Comment comment = new Comment { Profile = profile, ProfilePhotoId = PhotoId, Message = message };
            _context.Comments.Add(comment);
            _context.SaveChanges();
            return comment;
        }

        public IEnumerable<Comment> GetPhotoComments(int PhotoId)
        {
            return _context.Comments.Include(x => x.Profile).ThenInclude(x => x.User).Where(x => x.ProfilePhotoId == PhotoId);
        }
    }
}
