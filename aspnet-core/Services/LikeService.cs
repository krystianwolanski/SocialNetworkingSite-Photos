using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface ILikeService
    {
        IEnumerable<Like> GetAllLikes();
    }
    public class LikeService : ILikeService
    {
        DataContext _context;

        public LikeService(DataContext context)
        {
            _context = context;
        }
        public IEnumerable<Like> GetAllLikes()
        {
            return _context.Likes;
        }
    }
}
