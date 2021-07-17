using API.Commands;
using API.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.CommandHandlers
{
    public class DeleteLevelCommandHandler : IRequestHandler<DeleteLevelCommand>
    {
        private readonly GarageContext _garageContext;

        public DeleteLevelCommandHandler(GarageContext garageContext)
        {
            _garageContext = garageContext;
        }

        public async Task<Unit> Handle(DeleteLevelCommand cmd, CancellationToken cancellationToken)
        {
            var exist = await _garageContext.Locations
                            .Where(e => e.Level == cmd.Level)
                            .AnyAsync(cancellationToken);
            if (!exist)
                throw new Exception("Level doesn't exists. Cannot delete.");


            _garageContext.Locations.RemoveRange(_garageContext.Locations.Where(e => e.Level == cmd.Level));
            var result = await _garageContext.SaveChangesAsync();
            if (result > 0)
                return Unit.Value;
            
            throw new Exception("Error");
        }
    }
}
