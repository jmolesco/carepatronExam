using api.DataModel;
using api.Models;
using api.Repositories;
using AutoMapper;

namespace api.Services
{
    public interface IClientService {
        Task<bool> CreateClient(CreateClientRequest dtoModel);
        Task<bool> UpdateClient(string clientId, UpdateClientRequest dtoModel);
        Task<List<SearchClientResponse>> GetAllClient(SearchClientRequest dtoModel);
    }
    public class ClientService:IClientService
    {
        private readonly IClientRepository _clientRepository;
        private IMapper _mapper;
        public ClientService(IClientRepository clientRepository,
            IMapper mapper
            )
        {
            _clientRepository = clientRepository;
            _mapper = mapper;
        }
        public async Task<List<SearchClientResponse>> GetAllClient(SearchClientRequest dtoModel)
        {
            var result =await _clientRepository.Get(dtoModel);
            var mappedClient = _mapper.Map<List<SearchClientResponse>>(result);
            return mappedClient;
        }
        public async Task<bool> CreateClient(CreateClientRequest dtoModel)
        {
            var mappedClient = _mapper.Map<Client>(dtoModel);
            var result = await _clientRepository.Create(mappedClient);
            return true;
        }
        public async Task<bool> UpdateClient(string clientId, UpdateClientRequest dtoModel)
        {
            var mappedClient = _mapper.Map<Client>(dtoModel);
            mappedClient.Id = clientId;
            var result = await _clientRepository.Update(mappedClient);
            return true;
        }
    }
}
