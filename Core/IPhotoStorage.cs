
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AngularNetCore.Core
{
     public interface IPhotoStorage
    {
        Task<string> StorePhotoAsync(string uploadsFolderPath, IFormFile file);
    }

    

}