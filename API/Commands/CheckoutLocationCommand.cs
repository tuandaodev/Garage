using API.Responses;
using MediatR;

namespace API.Commands
{
    public class CheckoutLocationCommand : IRequest<CheckoutResultModel>
    {
        public string LicensePlate { get; set; }
    }
}