using API.Commands;
using API.Models;
using API.Responses;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace API.CommandHandlers
{
    public class CheckinLocationCommandHandler : IRequestHandler<CheckinLocationCommand, CheckinResultModel>
    {
        private readonly GarageContext _garageContext;

        public CheckinLocationCommandHandler(GarageContext garageContext)
        {
            _garageContext = garageContext;
        }

        public async Task<CheckinResultModel> Handle(CheckinLocationCommand cmd, CancellationToken cancellationToken)
        {
            var exist = await _garageContext.Locations.AnyAsync(e => e.LicensePlate == cmd.LicensePlate.Trim());
            if (exist)
                throw new Exception($"License plate \"{cmd.LicensePlate}\" already exists in the garage.");

            var location = await _garageContext.Locations.FirstOrDefaultAsync(e => string.IsNullOrEmpty(e.LicensePlate));
            if (location == null)
                throw new Exception($"Not found available location in the garage.");

            location.LicensePlate = cmd.LicensePlate.Trim();
            location.VehicleTypeId = cmd.VehicleTypeId;
            location.UpdatedDate = DateTime.Now;
            _garageContext.Locations.Update(location);

            var result = await _garageContext.SaveChangesAsync();
            if (result > 0)
            {
                string vehicleTypeName = string.Empty;
                if (cmd.VehicleTypeId.HasValue)
                    vehicleTypeName = (await _garageContext.VehicleTypes.FirstOrDefaultAsync(e => e.VehicleTypeId == cmd.VehicleTypeId))?.VehicleTypeName;

                return new CheckinResultModel
                {
                    LocationCode = location.LocationCode,
                    LicensePlate = location.LicensePlate,
                    VehicleTypeName = vehicleTypeName
                };
            }
            
            throw new Exception("Error");
        }
    }
}
