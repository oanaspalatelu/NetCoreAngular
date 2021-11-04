using System.Threading.Tasks;

namespace AngularNetCore.Core
{
    public interface IUnitOfWork
    {
         Task CompleteAsync();
    }
}