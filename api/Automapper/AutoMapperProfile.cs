using api.DataModel;
using api.Models;
using AutoMapper;

namespace api.Automapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateClientRequest, Client>().ReverseMap();
            CreateMap<Client, SearchClientResponse>().ReverseMap();
            CreateMap<UpdateClientRequest, Client>().ReverseMap();
        }
    }
}
