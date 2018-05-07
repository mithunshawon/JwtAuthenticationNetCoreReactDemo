using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JwtAuthenticationDemo.Models
{
    public class BookSeeker
    {
        public int Id { get; set; }
        public string IdentityId { get; set; }
        public User Identity { get; set; } 
        public string Location { get; set; }
        public string Gender { get; set; }
    }
}
