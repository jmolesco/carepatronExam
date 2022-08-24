using api.DataModel;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        public ClientController(IClientService clientService) {
            _clientService = clientService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateClient([FromBody] CreateClientRequest dtoModel)
        {
            var result =await _clientService.CreateClient(dtoModel);
            return Ok(result);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateClient([FromRoute] string id, [FromBody] UpdateClientRequest dtoModel)
        {
            var result = await _clientService.UpdateClient(id,dtoModel);
            return Ok(result);
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchClient([FromQuery] SearchClientRequest dtoModel)
        {
            var result = await _clientService.GetAllClient(dtoModel);
            return Ok(result);
        }
    }
}
