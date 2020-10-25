using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Foods
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Brand { get; set; }
            public float calories { get; set; }
            public float protein { get; set; }
            public float fat { get; set; }
            public float sugar { get; set; }
            public float starch { get; set; }
            public float fiber { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var food = await _context.Foods.FindAsync(request.Id);
                if (food == null)
                    throw new Exception("could not find food");

                food.Name = request.Name ?? food.Name;
                food.Brand = request.Brand ?? food.Brand;
                food.calories = request.calories;
                food.protein = request.protein;
                food.fat = request.fat;
                food.sugar = request.sugar;
                food.starch = request.starch;
                food.fiber = request.fiber;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }
        }
    }
}