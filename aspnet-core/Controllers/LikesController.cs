using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Likes;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LikesController : ControllerBase
    {
        private ILikeService _likeService;
        private IMapper _mapper;

        public LikesController(
            ILikeService likeService,
            IMapper mapper
            )
        {
            _likeService = likeService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllLikes()
        {
            var likes = await Task.Run(() => _likeService.GetAllLikes());
            var model = _mapper.Map<IEnumerable<LikeModel>>(likes);

            return Ok(model);
        }

    }
}