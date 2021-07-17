using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleTypesController : ControllerBase
    {
        private readonly IVehicleTypeService _vehicleTypeService;

        public VehicleTypesController(IVehicleTypeService vehicleTypeService)
        {
            _vehicleTypeService = vehicleTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _vehicleTypeService.GetVehicleTypesAsync());
        }
    }
}
