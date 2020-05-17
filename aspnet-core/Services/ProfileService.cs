using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Profiles;

namespace WebApi.Services
{
    public interface IProfileService
    {
        IEnumerable<Profile> GetAll();
        bool AddAvatar(int id, string pathOnServer);
        bool AddBanner(int id, string pathOnServer);
        Profile Get(string username);


    }
    public class ProfileService : IProfileService
    {
        private DataContext _context;
        private IWebHostEnvironment _webHostEnvironment;
        public ProfileService(DataContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public bool AddAvatar(int id, string pathOnServer)
        {
            var profile = _context.Profiles.Single(x => x.Id == id);
            profile.ProfileImageUrl = pathOnServer;
            _context.SaveChanges();

            return true;
        }

        public bool AddBanner(int id, string pathOnServer)
        {
            var profile = _context.Profiles.Single(x => x.Id == id);
            profile.BannerImageUrl = pathOnServer;
            _context.SaveChanges();

            return true;
        }

        public Profile Get(string username)
        {
            
            return _context.Profiles.Include(b => b.User).SingleOrDefault(profile => profile.User.Username == username);
        }

        public IEnumerable<Profile> GetAll()
        {
            return _context.Profiles.Include(b => b.User);
        }


    }
}
