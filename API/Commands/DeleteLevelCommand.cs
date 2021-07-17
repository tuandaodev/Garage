using MediatR;

namespace API.Commands
{
    public class DeleteLevelCommand : IRequest<Unit>
    {
        public int Level { get; set; }
    }
}
