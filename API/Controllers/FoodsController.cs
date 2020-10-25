using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Foods;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public FoodsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Food>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Food>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }
    }
}