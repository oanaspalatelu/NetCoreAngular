using System;
using System.Threading.Tasks;
using AngularNetCore.Controllers.Resouces;
using AngularNetCore.Models;
using AngularNetCore.Persistance;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularNetCore.Controllers
{
    [Route(("/api/vehicle"))]
    public class VehiclesConroller : Controller
    {
        private readonly IMapper mapper;
        private readonly VegaDBContext context;
        public VehiclesConroller(IMapper mapper, VegaDBContext context){
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody]VehicleResource vehicleResource){
            
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now; 

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

         [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody]VehicleResource vehicleResource){
            
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var vehicle = await context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

             if(vehicle == null){
                return NotFound();
            }

            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now; 

            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id){
            
         
            var vehicle = await context.Vehicles.FindAsync(id);

            if(vehicle == null){
                return NotFound();
            }

            context.Remove(vehicle);
            await context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id){
            
         
            var vehicle = await context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

            if(vehicle == null){
                return NotFound();
            }

            var vehicleResorce =  mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResorce);
        }
    }
}