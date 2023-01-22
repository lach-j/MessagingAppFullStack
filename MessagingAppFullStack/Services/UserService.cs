using MessagingAppFullStack.Domain.Context;
using MessagingAppFullStack.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Services;

public class UserService : IUserService
{

    private readonly EfCoreContext _db = new();
    
    public async Task<User?> GetUserByIdAsync(long id)
    {
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Id == id);
        return user;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == email);
        return user;
    }

    public async Task<List<User>> GetUsersByIdsAsync(IEnumerable<long> ids)
    {
        var users = await _db.Users.Where(u => ids.Contains(u.Id)).ToListAsync();
        return users;
    }

    public async Task<User?> CreateUserAsync(User user)
    {
        var existing = await _db.Users.FirstOrDefaultAsync(u => u.Username == user.Username);

        if (existing is not null)
            return null;

        var created = await _db.Users.AddAsync(user);
        await _db.SaveChangesAsync().ConfigureAwait(false);
        return created.Entity;
    }

    public async Task<List<User>> GetAllUsersAsync()
    {
        var users = await _db.Users
            .Include(u => u.Roles)
            .ThenInclude(r => r.Permissions)
            .ToListAsync();

        return users;
    }
}