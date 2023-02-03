using MessagingAppFullStack.Domain.Models;

namespace MessagingAppFullStack.Middleware;

public interface IUserProvider
{
    long? GetUserId();
    Task<User?> GetCurrentUserAsync();
}