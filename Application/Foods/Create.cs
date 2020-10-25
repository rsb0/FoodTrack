using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Foods
{
    public class Create
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
                var food = new Food
                {
                    Id = request.Id,
                    Name = request.Name,
                    Brand = request.Brand,
                    calories = request.calories,
                    protein = request.protein,
                    fat = request.fat,
                    sugar = request.sugar,
                    starch = request.starch,
                    fiber = request.fiber
                };

                _context.Foods.Add(food);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}