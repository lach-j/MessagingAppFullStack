using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Requests;
using MessagingAppFullStack.Security;
using MessagingAppFullStack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IPermissionService _permissionService;

    public UserController(IUserService userService, IPermissionService permissionService)
    {
        _userService = userService;
        _permissionService = permissionService;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult<User>> CreateUser(NewUserRequest userRequest)
    {
        var user = new User
        {
            Email = userRequest.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(userRequest.Password)
        };

        var createdUser = await _userService.CreateUserAsync(user);
        if (createdUser is null)
            return Conflict(new [] { $"{nameof(User)} with email '{userRequest.Email}' already exists." });
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
        
    [HttpGet]
    [Route("{userId:long}/permission")]
    public async Task<ActionResult> HasPermission([FromRoute] long userId, [FromQuery] string permission)
    {
        
        if (!Enum.TryParse<PermissionType>(permission, out var permissionType))
            return Ok(new { HasPermission = false });
        
        var hasPermission = await _permissionService.UserHasPermissionAsync(userId, permissionType);

        return Ok(new { HasPermission = hasPermission });
    }
}