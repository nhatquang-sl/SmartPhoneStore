using SmartPhoneStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPhoneStore.Repositories
{
    public interface ICityRepository : IGenericRepository<City>
    {
        City GetById(int id);
    }
}
