using MessagingAppFullStack.Domain.Context;
using MessagingAppFullStack.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Services;

public class UserService : IUserService
{
    public async Task<User?> GetUserByIdAsync(long id)
    {
        await using var db = new EfCoreContext();

        var user = await db.Users.SingleOrDefaultAsync(u => u.Id == id);
        return user;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        await using var db = new EfCoreContext();

        var user = await db.Users.SingleOrDefaultAsync(u => u.Username == email);
        return user;
    }

    public async Task<List<User>> GetUsersByIdsAsync(IEnumerable<long> ids)
    {
        await using var db = new EfCoreContext();

        var users = await db.Users.Where(u => ids.Contains(u.Id)).ToListAsync();
        return users;
    }

    public async Task<User?> CreateUserAsync(User user)
    {
        await using var db = new EfCoreContext();

        var existing = await db.Users.FirstOrDefaultAsync(u => u.Username == user.Username);

        if (existing is not null)
            return null;

        var created = await db.Users.AddAsync(user);
        await db.SaveChangesAsync().ConfigureAwait(false);
        return created.Entity;
    }

    public async Task<List<User>> GetAllUsersAsync()
    {
        await using var db = new EfCoreContext();

        var users = await db.Users
            .ToListAsync();

        return users;
    }
}