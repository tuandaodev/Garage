using API.Commands;
using API.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.CommandHandlers
{
    public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand>
    {
        private readonly GarageContext _garageContext;

        public CreateLocationCommandHandler(GarageContext garageContext)
        {
            _garageContext = garageContext;
        }

        public async Task<Unit> Handle(CreateLocationCommand cmd, CancellationToken cancellationToken)
        {
            var exist = await _garageContext.Locations
                            .Where(e => e.Level == cmd.Level)
                            .AnyAsync(cancellationToken);
            if (exist)
                throw new Exception("Level exists");

            List<Location> newLocations = new List<Location>();
            for (int x = 1; x <= cmd.MaxX; x++)
                for (int y = 1; y <= cmd.MaxY; y++)
                {
                    var newLocation = new Location
                    {
                        LocationCode = $"L{cmd.Level}_{x}_{y}",
                        Level = cmd.Level,
                        X = x,
                        Y = y,
                    };
                    newLocations.Add(newLocation);
                }

            _garageContext.Locations.AddRange(newLocations);
            var result = await _garageContext.SaveChangesAsync();
            if (result > 0)
                return Unit.Value;
            
            throw new Exception("Error");
        }
    }
}
