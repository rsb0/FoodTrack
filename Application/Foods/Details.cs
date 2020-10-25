using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Foods
{
    public class Details
    {
        public class Query : IRequest<Food>
        {
            public Guid Id { get; set; }

            public class Handler : IRequestHandler<Query, Food>
            {
                private readonly DataContext _context;
                public Handler(DataContext context)
                {
                    _context = context;
                }
                public async Task<Food> Handle(Query request, CancellationToken cancellationToken)
                {
                    var food = await _context.Foods.FindAsync(request.Id);

                    if (food == null)
                        throw new RestException(HttpStatusCode.NotFound, new { food = "Not found" });

                    return food;
                }
            }
        }
    }
}