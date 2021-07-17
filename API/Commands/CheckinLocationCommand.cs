using API.Responses;
using MediatR;

namespace API.Commands
{
    public class CheckinLocationCommand : IRequest<CheckinResultModel>
    {
        public string LicensePlate { get; set; }
        public int? VehicleTypeId { get; set; }
    }
}