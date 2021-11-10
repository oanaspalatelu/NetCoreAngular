using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularNetCore.Core;
using AngularNetCore.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularNetCore.Persistance
{
     public class PhotoRepository : IPhotoRepository{

         private readonly VegaDBContext context;

         public PhotoRepository(VegaDBContext context){
            this.context = context;
        }

         public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId){
             return await context.Photos.Where(p=> p.VehicleId == vehicleId).ToListAsync();
         }

     }

}