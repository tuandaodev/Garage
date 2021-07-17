using MediatR;

namespace API.Commands
{
    public class CreateLocationCommand : IRequest<Unit>
    {
        public int Level { get; set; }
        public int MaxX { get; set; }
        public int MaxY { get; set; }
    }
}
