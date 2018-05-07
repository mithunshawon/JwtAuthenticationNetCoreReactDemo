using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JwtAuthenticationDemo.Context;
using JwtAuthenticationDemo.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JwtAuthenticationDemo.Controllers
{
    [Authorize(Policy = "ApiAccess")]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly ApplicationDbContext _appDbContext;

        public HomeController(UserManager<User> userManager, ApplicationDbContext appDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            var userId = _caller.Claims.Single(c => c.Type == "id");
            var customer = await _appDbContext.BookSeekers.Include(c => c.Identity).SingleAsync(c => c.Identity.Id == userId.Value);

            return new OkObjectResult(new
            {
                customer.Identity.FirstName,
                customer.Identity.LastName,
                customer.Location,
                customer.Gender
            });
        }
    }
}