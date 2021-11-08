using System.Collections.Generic;

namespace AngularNetCore.Controllers.Resouces
{

    public class QueryResultResource<T>{
        public int TotalItems { get; set; }
        public IEnumerable<T> Items { get; set; }
    }

}