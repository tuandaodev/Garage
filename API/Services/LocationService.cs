using API.Models;
using API.Responses;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ILocationService
    {
        Task<List<LocationBriefDto>> GetBriefLocationsAsync(int level);
        Task<List<int>> GetLevelsAsync();
    }

    public class LocationService : ILocationService
    {
        private readonly GarageContext _garageContext;

        public LocationService(GarageContext garageContext)
        {
            _garageContext = garageContext;
        }

        public async Task<List<LocationBriefDto>> GetBriefLocationsAsync(int level)
        {
            return await _garageContext.Locations
            .Where(e => e.Level == level)
            .OrderBy(x => x.X)
            .ThenBy(x => x.Y)
            .LeftJoin(_garageContext.VehicleTypes,
                    p => p.VehicleTypeId,
                    e => e.VehicleTypeId,
                    (p, e) => new {
                        p.LocationCode,
                        p.LocationId,
                        p.LicensePlate,
                        p.UpdatedDate,
                        p.CreatedDate,
                        e.VehicleTypeName
                    }
            )
            .Select(x => new LocationBriefDto
            {
                LocationId = x.LocationId,
                LocationCode = x.LocationCode,
                LicensePlate = x.LicensePlate,
                VehicleTypeName = x.VehicleTypeName,
                CreatedDate = x.CreatedDate,
                UpdatedDate = x.UpdatedDate
            })
            .ToListAsync();
        }

        public async Task<List<int>> GetLevelsAsync()
        {
            return await _garageContext.Locations
                .Select(x => x.Level)
                .Distinct()
                .OrderByDescending(x => x)
                .ToListAsync();
        }
    }
}
