using AngularNetCore.Controllers.Resouces;
using AngularNetCore.Models;
using AutoMapper;

namespace AngularNetCore.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
        }
    }
}