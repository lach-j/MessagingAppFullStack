using System.Security.Claims;
using MessagingAppFullStack.Domain.Context;
using MessagingAppFullStack.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Middleware;

public class UserProvider : IUserProvider
{
    private readonly IHttpContextAccessor _context;
    private readonly EfCoreContext _db;
    
    public UserProvider (IHttpContextAccessor context, EfCoreContext db)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _db = db;
    }

    public long? GetUserId()
    {
        var userId = _context.HttpContext?.User.Claims
            .FirstOrDefault(i => i.Type == ClaimTypes.NameIdentifier)
            ?.Value;

        return userId is not null
            ? long.Parse(userId)
            : null;
    }

    public async Task<User?> GetCurrentUserAsync()
    {
        return await _db.Users.SingleOrDefaultAsync(u => u.Id == GetUserId());
    }
}