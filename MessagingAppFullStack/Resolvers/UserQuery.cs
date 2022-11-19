using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Security;

namespace MessagingAppFullStack.Resolvers;

public class UserQuery
{
    public User GetUser()
    {
        return new User()
        {
            Id = 1L,
            Username = "Test",
            Roles = new List<Role>()
            {
                new Role()
                {
                    Id = 0L,
                    Name = "StandardUser",
                    Permissions = new List<Permission>()
                    {
                        new Permission()
                        {
                            Id = 0L,
                            Name = PermissionType.EditOwn
                        }
                    }
                }
            },
            Password = "testpass"
        };
    }
}