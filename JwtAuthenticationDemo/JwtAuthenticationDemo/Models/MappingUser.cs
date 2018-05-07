using AutoMapper;
using JwtAuthenticationDemo.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JwtAuthenticationDemo.Models
{
    public class MappingUser:Profile
    {
        public MappingUser()
        {
            CreateMap<RegistrationVM, User>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}
