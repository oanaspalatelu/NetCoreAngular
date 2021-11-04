using System.Threading.Tasks;
using AngularNetCore.Core;
using AngularNetCore.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularNetCore.Persistance
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDBContext context;
        public VehicleRepository(VegaDBContext context){
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true){
            
            if(!includeRelated){
                return await context.Vehicles.FindAsync(id);
            }else{
                 return await context.Vehicles
                 .Include(v => v.Features)
                 .ThenInclude(vf => vf.Feature)
                 .Include(v => v.Model)
                 .ThenInclude(m => m.Make)
                 .SingleOrDefaultAsync(v => v.Id == id);
            }

        }

        public void AddVehicle(Vehicle vehicle){

            context.Vehicles.Add(vehicle);

        }

         public void RemoveVehicle(Vehicle vehicle){

            context.Remove(vehicle);

        }
    }
}