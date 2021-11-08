using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AngularNetCore.Core;
using AngularNetCore.Core.Models;
using AngularNetCore.Extensions;
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

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObject){
            
            var result = new QueryResult<Vehicle>();

             var query = context.Vehicles
                 .Include(v => v.Model)
                 .ThenInclude(m => m.Make)
                 .Include(v => v.Features)
                 .ThenInclude(vf => vf.Feature)
                 .AsQueryable();

            if(queryObject.MakeId.HasValue){
                query = query.Where(v => v.Model.MakeId == queryObject.MakeId.Value);
            }

            if(queryObject.ModelId.HasValue){
                query = query.Where(v => v.ModelId == queryObject.ModelId.Value);
            }

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>(){
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] =  v => v.ContactName
            };

            query = query.ApplyOrdering(queryObject,columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObject);

            result.Items =  await query.ToListAsync();

            return result;
        }

       
    }
}