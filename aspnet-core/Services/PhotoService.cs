using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;
using static WebApi.Services.PhotoService;

namespace WebApi.Services
{
    public interface IPhotoService
    {
        IEnumerable<ProfilePhoto> GetAllUserPhotos(string username);
        IEnumerable<ProfilePhoto> GetAllPhotos();
        ProfilePhoto GetPhoto(string username, int id);

        ProfilePhoto AddPhoto(string username, string pathForFile);
    }

    public class PhotoService:IPhotoService
    {
        private DataContext _context;

        public PhotoService(DataContext context)
        {
            _context = context;
        }
        
        public IEnumerable<ProfilePhoto> GetAllUserPhotos(string username)
        {
            return _context.Photos.Include(a => a.Profile).ThenInclude(b => b.User).Where(x => x.Profile.User.Username == username);

        }
        public ProfilePhoto GetPhoto(string username, int id)
        {
            return _context.Photos.Include(b => b.Profile).ThenInclude(c => c.User).SingleOrDefault(x => x.Profile.User.Username == username && x.Id == id);
        }
        public ProfilePhoto AddPhoto(string username, string pathForFile)
        {
            var profile = _context.Profiles.SingleOrDefault(profile => profile.User.Username == username);
            ProfilePhoto newPhoto = new ProfilePhoto() { ImageUrl = pathForFile, Profile = profile };

            _context.Photos.Add(newPhoto);
            _context.SaveChanges();


            //ProfileImages profileImages = new ProfileImages();
            //profileImages.ImageUrl = pathForFile;
            //profile.ProfileImages.Add(profileImages);

            //_context.SaveChanges();

            return newPhoto;

        }

        public IEnumerable<ProfilePhoto> GetAllPhotos()
        {
            return _context.Photos.Include(x => x.Profile).ThenInclude(x => x.User);
        }
    }
}
