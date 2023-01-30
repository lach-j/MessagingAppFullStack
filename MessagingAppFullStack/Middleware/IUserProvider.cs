namespace MessagingAppFullStack.Middleware;

public interface IUserProvider
{
    long? GetUserId();
}