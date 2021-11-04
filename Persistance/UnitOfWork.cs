using System.Threading.Tasks;
using AngularNetCore.Core;

namespace AngularNetCore.Persistance
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDBContext context;
        public UnitOfWork(VegaDBContext context){
            this.context = context;
        }
        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}