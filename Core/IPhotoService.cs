using System.Collections.Generic;
using System.Threading.Tasks;
using AngularNetCore.Core.Models;
using Microsoft.AspNetCore.Http;

namespace AngularNetCore.Core
{
     public interface IPhotoService
    {
        Task<Photo> UploadPhotoAsync(Vehicle vehicle, IFormFile file, string uploadsFolderPath);
    }

    

}