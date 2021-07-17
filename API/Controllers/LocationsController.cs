using API.Commands;
using API.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILocationService _locationService;

        public LocationsController(IMediator mediator, ILocationService locationService)
        {
            _mediator = mediator;
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int level)
        {
            return Ok(await _locationService.GetBriefLocationsAsync(level));
        }

        [HttpGet("get-levels")]
        public async Task<IActionResult> GetLevels()
        {
            return Ok(await _locationService.GetLevelsAsync());
        }

        [HttpPost]
        public async Task<NoContentResult> CreateLocations(CreateLocationCommand request)
        {
            await _mediator.Send(request);
            return NoContent();
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn(CheckinLocationCommand request)
        {
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOut(CheckoutLocationCommand request)
        {
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpDelete("level/{level}")]
        public async Task<NoContentResult> DeleteLevel(int level)
        {
            var cmd = new DeleteLevelCommand
            {
                Level = level
            };
            await _mediator.Send(cmd);
            return NoContent();
        }
    }
}
