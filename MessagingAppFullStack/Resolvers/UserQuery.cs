using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Services;

namespace MessagingAppFullStack.Resolvers;

public class UserQuery
{
    private readonly IUserService _userService;

    public UserQuery(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<User?> GetUser(long id)
    {
        return await _userService.GetUserByIdAsync(id);
    }

    public async Task<ICollection<User>> GetUsers()
    {
        return await _userService.GetAllUsersAsync();
    }
}