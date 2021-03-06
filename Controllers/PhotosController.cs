
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
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository photoRepostory;
        private readonly IPhotoService photoService;

        public PhotosController(IWebHostEnvironment host, IVehicleRepository repository, IMapper mapper, IOptionsSnapshot<PhotoSettings> options,
        IPhotoRepository photoRepostory, IPhotoService photoService)
        {
            this.photoService = photoService;
            this.host = host;
            this.repository = repository;
            this.mapper = mapper;
            this.photoSettings = options.Value;
            this.photoRepostory = photoRepostory;
        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromRoute] int vehicleId, [FromForm] IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
            {
                return NotFound();
            }
            if (file == null)
            {
                return BadRequest("Null file");
            }
            if (file.Length == 0)
            {
                return BadRequest("Empty file");
            }
            if (file.Length > photoSettings.MaxBytes)
            {
                return BadRequest("Max file size exceeded");
            }
            if (!photoSettings.IsSupported(file.FileName))
            {
                return BadRequest("Invalid file type");
            }

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");

            var photo = await photoService.UploadPhotoAsync(vehicle, file, uploadsFolderPath);

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {

            var photos = await photoRepostory.GetPhotos(vehicleId);

            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);

        }

    }
}