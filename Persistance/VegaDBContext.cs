
using Microsoft.EntityFrameworkCore;
using AngularNetCore.Models;

namespace AngularNetCore.Persistance
{
    public class VegaDBContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        
        
        public VegaDBContext(DbContextOptions<VegaDBContext> options) : base(options){

        }
    }
}