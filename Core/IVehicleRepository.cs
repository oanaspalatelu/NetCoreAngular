using System.Threading.Tasks;
using AngularNetCore.Core.Models;

namespace AngularNetCore.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id,  bool includeRelated = true);
        void AddVehicle(Vehicle vehicle);
        void RemoveVehicle(Vehicle vehicle);
    }
}