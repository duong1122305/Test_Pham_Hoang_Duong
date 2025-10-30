using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TEST.Data
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Dob { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber), MaxLength(10)]
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}
