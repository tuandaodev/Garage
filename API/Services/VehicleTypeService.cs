using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IVehicleTypeService
    {
        Task<List<VehicleType>> GetVehicleTypesAsync();
    }

    public class VehicleTypeService : IVehicleTypeService
    {
        private readonly GarageContext _garageContext;

        public VehicleTypeService(GarageContext garageContext)
        {
            _garageContext = garageContext;
        }

        public async Task<List<VehicleType>> GetVehicleTypesAsync()
        {
            return await _garageContext.VehicleTypes
                .ToListAsync();
        }
    }
}
