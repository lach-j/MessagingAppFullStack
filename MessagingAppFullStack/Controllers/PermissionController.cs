using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Requests;
using MessagingAppFullStack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PermissionController : ControllerBase
{
    private readonly IPermissionService _permissionService;
    
    public PermissionController(IPermissionService permissionService)
    {
        _permissionService = permissionService;
    }

    [HttpGet]
    public async Task<ActionResult<ICollection<Permission>>> GetAllPermissions()
    {
        return Ok(await _permissionService.GetAllPermissionsAsync());
    }

    [HttpPost]
    public async Task<ActionResult<Permission>> CreatePermission([FromBody] NewPermissionRequest permissionRequest)
    {
        var newPerm = await _permissionService.CreatePermissionAsync(
            new Permission() {Name = permissionRequest.Name, Description = permissionRequest.Description});

        return Ok(newPerm);
    }
}