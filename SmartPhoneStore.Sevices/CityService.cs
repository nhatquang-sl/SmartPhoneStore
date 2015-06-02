using SmartPhoneStore.Models;
using SmartPhoneStore.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPhoneStore.Sevices
{
    public class CityService : EntityService<City>, ICityService
    {
        IUnitOfWork _unitOfWork;
        ICityRepository _cityRepository;
        public CityService(IUnitOfWork unitOfWork, ICityRepository cityRepository)
            : base(unitOfWork, cityRepository)
        {
            _unitOfWork = unitOfWork;
            _cityRepository = cityRepository;
        }

        public City GetById(int id)
        {
            return _cityRepository.GetById(id);
        }
    }
}
