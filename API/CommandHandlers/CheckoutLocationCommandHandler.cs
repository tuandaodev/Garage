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
    public class CheckoutLocationCommandHandler : IRequestHandler<CheckoutLocationCommand, CheckoutResultModel>
    {
        private readonly GarageContext _garageContext;

        public CheckoutLocationCommandHandler(GarageContext garageContext)
        {
            _garageContext = garageContext;
        }

        public async Task<CheckoutResultModel> Handle(CheckoutLocationCommand cmd, CancellationToken cancellationToken)
        {
            Location location = await _garageContext.Locations
                                    .FirstOrDefaultAsync(e => e.LicensePlate == cmd.LicensePlate.Trim(), cancellationToken: cancellationToken);
            if (location == null)
                throw new Exception($"License plate \"{cmd.LicensePlate}\" isn't in garage.");

            var tempLicensePlate = location.LicensePlate;
            var tempVehicleTypeId = location.VehicleTypeId;

            location.LicensePlate = string.Empty;
            location.VehicleTypeId = null;
            location.UpdatedDate = DateTime.Now;

            _garageContext.Update(location);
            var result = await _garageContext.SaveChangesAsync();
            if (result > 0)
            {
                string vehicleTypeName = string.Empty;
                if (tempVehicleTypeId.HasValue)
                    vehicleTypeName = (await _garageContext.VehicleTypes.FirstOrDefaultAsync(e => e.VehicleTypeId == tempVehicleTypeId))?.VehicleTypeName;

                return new CheckoutResultModel
                {
                    LocationCode = location.LocationCode,
                    LicensePlate = tempLicensePlate,
                    VehicleTypeName = vehicleTypeName
                };
            }

            throw new Exception("Error");
        }
    }
}
