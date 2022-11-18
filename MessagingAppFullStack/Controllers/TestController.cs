using MessagingAppFullStack.Security;
using MessagingAppFullStack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    [RequiredPermissions(PermissionType.Unrestricted)]
    public ActionResult Get()
    {
        return Ok(new { Message = "Hello World!" });
    }
}