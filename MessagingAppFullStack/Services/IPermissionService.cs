using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Security;

namespace MessagingAppFullStack.Services;

public interface IPermissionService
{
    Task<bool> UserHasPermissionAsync(long userId, PermissionType permission);
    Task<bool> UserHasPermissionAsync(User user, PermissionType permission);

    Task<ICollection<Permission>> GetAllUserPermissionsAsync(User user);
    Task<ICollection<Permission>> GetAllUserPermissionsAsync(long userId);
    Task<ICollection<Permission>> GetAllPermissionsAsync();
    Task<Permission> CreatePermissionAsync(Permission permission);
}