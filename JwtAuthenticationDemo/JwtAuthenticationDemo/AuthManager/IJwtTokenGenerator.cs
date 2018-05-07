using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace JwtAuthenticationDemo.AuthManager
{
    public interface IJwtTokenGenerator
    {
        Task<string> GenerateJwtTokenAsync(string username, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
    }
}
