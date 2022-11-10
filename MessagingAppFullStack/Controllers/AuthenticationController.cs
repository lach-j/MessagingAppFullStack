using MessagingAppFullStack.Requests;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using MessagingAppFullStack.Configuration;
using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Services;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace MessagingAppFullStack.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly ILogger<AuthenticationController> _logger;
    private readonly IUserService _userService;
    private readonly AppSettings _appSettings;

    public AuthenticationController(ILogger<AuthenticationController> logger, IOptions<AppSettings> appSettings, IUserService userService)
    {
        _logger = logger;
        _appSettings = appSettings.Value;
        _userService = userService;
    }

    [HttpPost]
    [Route("token")]
    [HttpPost]
    public async Task<ActionResult> GetToken(TokenRequest tokenRequest)
    {
        var user = await _userService.GetUserByEmailAsync(tokenRequest.Username);

        if (user is null || !(tokenRequest.Username == user.Username && BCrypt.Net.BCrypt.Verify(tokenRequest.Password, user.Password)))
            return Unauthorized(new { Message = "Invalid Credentials" });

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Jwt.Key));
        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _appSettings.Jwt.Issuer,
            _appSettings.Jwt.Audience,
            claims,
            expires: DateTime.UtcNow.AddHours(10000),
            signingCredentials: signIn);

        return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}