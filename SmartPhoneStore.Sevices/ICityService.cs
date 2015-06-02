using SmartPhoneStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPhoneStore.Sevices
{
    public interface ICityService : IEntityService<City>
    {
        City GetById(int id);
    }
}
