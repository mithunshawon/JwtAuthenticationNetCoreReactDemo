using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using JwtAuthenticationDemo.Context;
using JwtAuthenticationDemo.Models;
using JwtAuthenticationDemo.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace JwtAuthenticationDemo.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public AccountController(UserManager<User> userManager, IMapper mapper, ApplicationDbContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "acc1", "acc2" };
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<User>(model);

            try
            {
                var result = await _userManager.CreateAsync(userIdentity, model.Password);
                if (!result.Succeeded) return new OkObjectResult("User Creation Failed");

                await _appDbContext.BookSeekers.AddAsync(new BookSeeker { IdentityId = userIdentity.Id, Location = model.Location });
                await _appDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return new OkObjectResult("User Creation Failed");
            }

            return new OkObjectResult("Account created");
        }
    }
}