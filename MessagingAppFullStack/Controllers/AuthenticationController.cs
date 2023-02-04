using System.Globalization;
using MessagingAppFullStack.Requests;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using MessagingAppFullStack.Configuration;
using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace MessagingAppFullStack.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IPermissionService _permissionService;
    private readonly AppSettings _appSettings;

    public AuthenticationController(
        IOptions<AppSettings> appSettings, IUserService userService, IPermissionService permissionService)
    {
        _appSettings = appSettings.Value;
        _userService = userService;
        _permissionService = permissionService;
    }

    [HttpPost]
    [Route("token")]
    public async Task<ActionResult> GetToken([FromBody] TokenRequest tokenRequest)
    {
        var user = await _userService.GetUserByEmailAsync(tokenRequest.Username);

        if (user is null || !(tokenRequest.Username == user.Username &&
                              BCrypt.Net.BCrypt.Verify(tokenRequest.Password, user.Password)))
            return Unauthorized(new []{"Invalid Credentials"});

        var permissions = await _permissionService.GetAllUserPermissionsAsync(user);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
            new Claim(
                "permissions", JsonSerializer.Serialize(permissions.Select(p => p.Name)),
                typeof(ICollection<Permission>).ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Jwt.Key));
        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _appSettings.Jwt.Issuer,
            _appSettings.Jwt.Audience,
            claims,
            expires: DateTime.UtcNow.AddHours(10000),
            signingCredentials: signIn);

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        HttpContext.Response.Cookies.Append(
            "X-Access-Token", tokenString,
            new CookieOptions()
            {
                HttpOnly = true, Expires = DateTimeOffset.UtcNow + TimeSpan.FromDays(1),
                Secure = true
            });

        return Ok(new {Token = tokenString});
    }
}