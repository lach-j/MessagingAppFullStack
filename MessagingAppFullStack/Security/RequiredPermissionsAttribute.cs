using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Security;

[AttributeUsage(AttributeTargets.All, AllowMultiple = false, Inherited = true)]
public class RequiredPermissionsAttribute : TypeFilterAttribute
{
    public ICollection<PermissionType> PermissionTypes { get; set; }

    public RequiredPermissionsAttribute(params PermissionType[] permissionTypes): base(typeof(CustomAuthorizationFilter))
    {
        PermissionTypes = permissionTypes;
    }

}

public enum PermissionType
{
    ViewOwn,
    EditOwn,
    DeleteOwn,
    Unrestricted
}