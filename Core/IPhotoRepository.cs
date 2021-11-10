using System.Collections.Generic;
using System.Threading.Tasks;
using AngularNetCore.Core.Models;

namespace AngularNetCore.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }

}