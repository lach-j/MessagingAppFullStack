using System.Security.Claims;

namespace MessagingAppFullStack.Middleware;

public class UserProvider : IUserProvider
{
    private readonly IHttpContextAccessor _context;

    public UserProvider (IHttpContextAccessor context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
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
}