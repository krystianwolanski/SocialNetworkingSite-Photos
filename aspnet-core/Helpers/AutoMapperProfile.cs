using AutoMapper;
using WebApi.Entities;
using WebApi.Models.Comments;
using WebApi.Models.Likes;
using WebApi.Models.Profiles;
using WebApi.Models.Users;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateModel, User>();

            CreateMap<Entities.Profile, ProfileModel>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username));

            CreateMap<ProfilePhoto, ProfilePhotosModel>()
            .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Profile.User.Username))
            .ForMember(dest => dest.ProfileImageUrl, opt => opt.MapFrom(src => src.Profile.ProfileImageUrl));

            CreateMap<Comment, CommentModel>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Profile.User.Username))
                .ForMember(dest => dest.ProfileImageUrl, opt => opt.MapFrom(src => src.Profile.ProfileImageUrl));
            //CreateMap<AddCommentModel, Comment>();

            CreateMap<Like, LikeModel>();
                
        }
    }
}