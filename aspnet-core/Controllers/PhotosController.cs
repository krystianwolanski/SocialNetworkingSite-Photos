using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Helpers;
using WebApi.Models.Profiles;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PhotosController : ControllerBase
    {
        IPhotoService _photoService;
        private IMapper _mapper;
        private IWebHostEnvironment _webHostEnvironment;

        public PhotosController(IPhotoService photoService,
            IMapper mapper,
            IWebHostEnvironment webHostEnvironment)
        {
            _photoService = photoService;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPhotos()
        {
            var photos = await Task.Run(() => _photoService.GetAllPhotos());
            var model = _mapper.Map<IList<ProfilePhotosModel>>(photos);

            return Ok(model);
        }
        [HttpGet("{username}")]
        public IActionResult GetPhotos(string username)
        {
            var profileImages = _photoService.GetAllUserPhotos(username);
            var model = _mapper.Map<IList<ProfilePhotosModel>>(profileImages);

            return Ok(model);
        }
        [HttpGet("{username}/{id}")]
        public IActionResult GetPhoto(string username, int id)
        {
            var photo = _photoService.GetPhoto(username, id);
            var model = _mapper.Map<ProfilePhotosModel>(photo);
            
            return Ok(model);
        }


        [Authorize]
        [HttpPost]
        public IActionResult AddPhoto([FromForm]IFormFile photo)
        {

            var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            //add img to static folder
            var wwww_root = _webHostEnvironment.WebRootPath;
            var path = @"\profiles\" + username + @"\profile_photos\";
            var upload_path = wwww_root + path;

            var pathForFile = upload_path + photo.FileName;

            try
            {
                using (FileStream fileStream = System.IO.File.Create(pathForFile))
                {
                    photo.CopyTo(fileStream);
                    fileStream.Flush();
                }
            }
            catch (DirectoryNotFoundException e)
            {

                return NotFound(pathForFile);
            }
            var pathOnServer = "http://" + Request.Host.Value + path + photo.FileName;
            var photoImage = _photoService.AddPhoto(username, pathOnServer);

            return Ok();

        }
    }
}