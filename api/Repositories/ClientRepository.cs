using api.Data;
using api.DataModel;
using api.Models;
using api.Utils.Extensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public interface IClientRepository
    {
        Task<Client[]> Get(SearchClientRequest dtoModel);
        Task<bool> Create(Client client);
        Task<bool> Update(Client client);
    }

    public class ClientRepository  : IClientRepository
    {
        private readonly DataContext dataContext;

        public ClientRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }


        //add response for checking whether transaction is successful
        public async Task<bool> Create(Client client)
        {
            try
            {
                await dataContext.AddAsync(client);
                await dataContext.SaveChangesAsync();
                return true;
            }catch(Exception)
            {
                return false;
            }
        }

        //added for search parameter
        public Task<Client[]> Get(SearchClientRequest dtoModel)
        {
            return dataContext.Clients.Where(
                x=> (dtoModel.KeywordSearch.HasValue() ? x.FirstName.ToLower().Contains(dtoModel.KeywordSearch.ToLower()) || x.LastName.ToLower().Contains(dtoModel.KeywordSearch.ToLower()) : 1==1)
                ).ToArrayAsync();
        }

        //add response for checking whether transaction is successful
        public async Task<bool> Update(Client client)
        {
            try
            {
                var existingClient = await dataContext.Clients.FirstOrDefaultAsync(x => x.Id == client.Id);

                if (existingClient == null)
                    return false;

                existingClient.FirstName = client.FirstName;
                existingClient.LastName = client.LastName;
                existingClient.Email = client.Email;
                existingClient.PhoneNumber = client.PhoneNumber;

                await dataContext.SaveChangesAsync();
                return true;
            }catch (Exception)
            {
                return false;
            }
        }
    }
}

