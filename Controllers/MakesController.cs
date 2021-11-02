using System.Collections.Generic;
using System.Threading.Tasks;
using AngularNetCore.Controllers.Resouces;
using AngularNetCore.Models;
using AngularNetCore.Persistance;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularNetCore.Controllers
{
    public class MakesController : Controller
    {
        private readonly VegaDBContext context;
        private readonly IMapper mapper;
        public MakesController(VegaDBContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes =  await context.Makes.Include(m => m.Models).ToListAsync();
            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}