using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Helpers;
using WebApi.Models.Profiles;
using WebApi.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfilesController : ControllerBase, IFile
    {
        IProfileService _profileService;
        private IMapper _mapper;
        IWebHostEnvironment _webHostEnvironment;

        public ProfilesController(IProfileService profileService,
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            IWebHostEnvironment webHostEnvironment,
            IConfiguration configuration)
        {
            _profileService = profileService;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var profiles = _profileService.GetAll();
            var model = _mapper.Map<IList<ProfileModel>>(profiles);
            return Ok(model);
        }

        [HttpGet("{username}")]
        public IActionResult Get(string username)
        {
            var profile = _profileService.Get(username);

            var model = _mapper.Map<ProfileModel>(profile);

            return Ok(model);
        }

        [Authorize]
        [HttpPost("avatar")]
        public async Task<IActionResult> AddAvatar([FromForm] IFormFile image)
        {
            var UserId = int.Parse(HttpContext.User.Identity.Name);
            var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var Path = @"/profiles/" + username + @"/profile_avatar/";
            var RootPath = _webHostEnvironment.WebRootPath + Path;

       
            string[] files = Directory.GetFiles(RootPath);
            await Task.Run(() => DeleteFiles(files));
       
            await Task.Run(() => UploadFile(image, RootPath));
            var pathOnServer = "http://" + Request.Host.Value + Path + image.FileName;
            await Task.Run(() => _profileService.AddAvatar(UserId, pathOnServer));
            
            return Ok(pathOnServer);
        }

        [Authorize]
        [HttpPost("banner")]
        public async Task<IActionResult> AddBanner([FromForm] IFormFile image)
        {
            var UserId = int.Parse(HttpContext.User.Identity.Name);
            var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var Path = @"/profiles/" + username + @"/profile_banner/";
            var RootPath = _webHostEnvironment.WebRootPath + Path;


            string[] files = Directory.GetFiles(RootPath);
            await Task.Run(() => DeleteFiles(files));

            await Task.Run(() => UploadFile(image, RootPath));
            var pathOnServer = "http://" + Request.Host.Value + Path + image.FileName;
            await Task.Run(() => _profileService.AddBanner(UserId, pathOnServer));

            return Ok(pathOnServer);
        }


        public bool UploadFile(IFormFile image, string path)
        {

            var pathForFile = path + image.FileName;
            
            try
            {
                using (FileStream fileStream = System.IO.File.Create(pathForFile))
                {
                    image.CopyTo(fileStream);
                    fileStream.Flush();
                }
            }
            catch (DirectoryNotFoundException e)
            {

                Console.WriteLine(e.Message);
            }

            return true;
        }

        public bool DeleteFiles(string[] files)
        {
            
            foreach (string file in files)
                System.IO.File.Delete(file);

            return true;
        }
    }
}