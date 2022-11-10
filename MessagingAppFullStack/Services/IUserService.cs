using MessagingAppFullStack.Domain.Models;

namespace MessagingAppFullStack.Services;

public interface IUserService
{
    public Task<User?> GetUserByIdAsync(long id);
    public Task<User?> GetUserByEmailAsync(string email);
    public Task<List<User>> GetUsersByIdsAsync(IEnumerable<long> ids);

    public Task<User?> CreateUserAsync(User user);
    public Task<List<User>> GetAllUsersAsync();
}