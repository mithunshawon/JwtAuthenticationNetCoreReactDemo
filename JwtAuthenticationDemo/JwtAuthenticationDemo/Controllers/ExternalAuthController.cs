using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using JwtAuthenticationDemo.AuthManager;
using JwtAuthenticationDemo.Context;
using JwtAuthenticationDemo.Models;
using JwtAuthenticationDemo.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace JwtAuthenticationDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ExternalAuthController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly JwtIssuerOptions _jwtOptions;
        private static readonly HttpClient Client = new HttpClient();

        public ExternalAuthController(IConfiguration configuration, UserManager<User> userManager, ApplicationDbContext appDbContext, IJwtTokenGenerator jwtTokenGenerator, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _configuration = configuration;
            _userManager = userManager;
            _appDbContext = appDbContext;
            _jwtTokenGenerator = jwtTokenGenerator;
            _jwtOptions = jwtOptions.Value;
        }

        // POST api/externalauth/facebook
        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody]FacebookVM model)
        {
            // 1.generate an app access token
            var appId = _configuration.GetSection("FacebookAuthSettings").GetSection("AppId");
            var appSecret = _configuration.GetSection("FacebookAuthSettings").GetSection("AppSecret");
            try
            {
                var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={appId.Value}&client_secret={appSecret.Value}&grant_type=client_credentials");
                //var appAccessTokenResponse = await Client.GetStringAsync("https://www.google.com/");
                var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);

            // 2. validate the user access token
                var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
                var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);
            }
            catch (Exception ex)
            {
            }
            // 3. we've got a valid token so we can request user data from fb
            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,birthday,picture&access_token={model.AccessToken}");
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            var user = await _userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                var User = new User
                {
                    FirstName = userInfo.FirstName,
                    LastName = userInfo.LastName,
                    IdentityProvider = "Facebook - " + userInfo.Id,
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                };

                var result = await _userManager.CreateAsync(User, Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8));

                if (!result.Succeeded) return new OkObjectResult("User Creation Failed");

                await _appDbContext.BookSeekers.AddAsync(new BookSeeker { IdentityId = User.Id, Location = "", Gender = userInfo.Gender });
                await _appDbContext.SaveChangesAsync();
            }

            // generate the jwt for the local user...
            var localUser = await _userManager.FindByNameAsync(userInfo.Email);

            if (localUser == null)
            {
                 return new OkObjectResult("login_failure , Failed to create local user account.");
            }
            var identity = _jwtTokenGenerator.GenerateClaimsIdentity(localUser.UserName, localUser.Id);

            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await _jwtTokenGenerator.GenerateJwtTokenAsync(localUser.UserName, identity),
                expires_in = (int)_jwtOptions.ValidFor.TotalSeconds
            };

            var jwt = JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return new OkObjectResult(jwt);
        }
    }
}