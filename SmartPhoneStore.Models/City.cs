using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartPhoneStore.Models
{
    public class City : Entity<int>
    {
        [Required]
        [MaxLength(50)]
        [Display(Name = "City Name")]
        public string Name { get; set; }

        public virtual IEnumerable<Person> Persons { get; set; }
    }
}
