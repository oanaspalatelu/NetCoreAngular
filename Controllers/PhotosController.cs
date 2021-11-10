
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AngularNetCore.Controllers.Resouces;
using AngularNetCore.Core;
using AngularNetCore.Core.Models;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AngularNetCore.Controllers
{

    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IWebHostEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository photoRepostory;

        public PhotosController(IWebHostEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options,
        IPhotoRepository photoRepostory)
        {
            this.host = host;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.photoSettings = options.Value;
            this.photoRepostory = photoRepostory;
        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromRoute] int vehicleId, [FromForm] IFormFile file)
        {
            var vehicle = await  repository.GetVehicle(vehicleId, includeRelated: false);
            if(vehicle == null){
                return NotFound();
            }
            if(file == null){
                return BadRequest("Null file");
            }
            if(file.Length == 0){
                return BadRequest("Empty file");
            }
            if(file.Length > photoSettings.MaxBytes){
                return BadRequest("Max file size exceeded");
            }
            if(!photoSettings.IsSupported(file.FileName)){
                return BadRequest("Invalid file type");
            }

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if(!Directory.Exists(uploadsFolderPath)){
                Directory.CreateDirectory(uploadsFolderPath);
            }
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create)){
                await file.CopyToAsync(stream);
            }

            var photo = new Photo{ FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId){

            var photos = await photoRepostory.GetPhotos(vehicleId); 

            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
            
        }

    }
}