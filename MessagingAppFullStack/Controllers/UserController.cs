using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Requests;
using MessagingAppFullStack.Security;
using MessagingAppFullStack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult<User>> CreateUser(NewUserRequest userRequest)
    {
        if (userRequest.ConfirmPassword != userRequest.Password)
            return BadRequest(new
            {
                Errors = new Dictionary<string, string[]>()
                {
                    {nameof(NewUserRequest.ConfirmPassword), new[] {"Passwords must match."}}
                }
            });

        var user = new User
        {
            Username = userRequest.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(userRequest.Password)
        };

        var createdUser = await _userService.CreateUserAsync(user);
        if (createdUser is null)
            return Conflict(new { Message = $"{nameof(User)} with email '{userRequest.Email}' already exists." });
        return Ok(createdUser);
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsers()
    {
        return await _userService.GetAllUsersAsync();
    }

    
    [HttpGet]
    [Route("{userId:long}")]
    public async Task<ActionResult> GetUserById([FromRoute] long userId)
    {
        return Ok(await _userService.GetUserByIdAsync(userId));
    }
}