using MessagingAppFullStack.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    [RequiredPermissions(PermissionType.Unrestricted)]
    public ActionResult Get()
    {
        return Ok(new { Message = "Hello World!" });
    }
}