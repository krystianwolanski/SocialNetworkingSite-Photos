using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Comments;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentsController : ControllerBase
    {
        ICommentService _commentService;
        private IMapper _mapper;
        private IWebHostEnvironment _webHostEnvironment;

        public CommentsController(ICommentService commentService,
            IMapper mapper,
            IWebHostEnvironment webHostEnvironment)
        {
            _commentService = commentService;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await Task.Run(() => _commentService.GetAll());
            var model = _mapper.Map<IEnumerable<CommentModel>>(comments);

            return Ok(model);
        }
        [HttpGet("photo/{id}")]
        public async Task<IActionResult> GetPhotoComments(int id)
        {
            var comments = await Task.Run(() => _commentService.GetPhotoComments(id));
            var model = _mapper.Map<IEnumerable<CommentModel>>(comments);

            return Ok(model);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostComment([FromBody] AddCommentModel addCommentModel)
        {
            var UserId = int.Parse(HttpContext.User.Identity.Name);
            var PhotoId = addCommentModel.ProfilePhotoId;
            var Message = addCommentModel.Message;
            
            var comment = await Task.Run(()=>_commentService.CreateComment(UserId, PhotoId, Message));
            
            var model = _mapper.Map<CommentModel>(comment);
            return Ok(model);
        }
    }
}