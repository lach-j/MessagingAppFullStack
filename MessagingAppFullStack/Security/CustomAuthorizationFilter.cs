using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;


namespace MessagingAppFullStack.Security;

public class CustomAuthorizationFilter : IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var endpoint = context.HttpContext.Features.Get<IEndpointFeature>()?.Endpoint;
        var attribute = endpoint?.Metadata.GetMetadata<RequiredPermissionsAttribute>();

        if (attribute?.PermissionTypes is null || !attribute.PermissionTypes.Any())
            return;

        var userPermissions = context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "permissions");
        if (userPermissions?.Value is null)
        {
            context.Result = GetForbiddenResult(attribute.PermissionTypes);
            return;
        }

        var permissions = JsonSerializer.Deserialize<ICollection<PermissionType>>(userPermissions.Value);

        if (attribute.PermissionTypes.Intersect(permissions).Count() == attribute.PermissionTypes.Count) return;

        context.Result = GetForbiddenResult(attribute.PermissionTypes);
    }

    private static ObjectResult GetForbiddenResult(IEnumerable<PermissionType> permissionTypes)
    {
        return new ObjectResult(
            new
            {
                Status = "Forbidden",
                StatusCode = (int) HttpStatusCode.Forbidden,
                Message =
                    $"Insufficient permissions. Requires ({string.Join(", ", permissionTypes.Select(p => p.ToString()))})"
            }) {StatusCode = (int) HttpStatusCode.Forbidden};
    }
}