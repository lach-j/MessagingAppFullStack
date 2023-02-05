using MessagingAppFullStack.Extensions;
using Microsoft.IdentityModel.Tokens;

namespace MessagingAppFullStack.Middleware;

public class LogRequestsMiddleware
{
    private readonly ILogger<LogRequestsMiddleware> _logger;
    private readonly RequestDelegate _next;


    public LogRequestsMiddleware(ILogger<LogRequestsMiddleware> logger, RequestDelegate next)
    {
        _logger = logger;
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var url = context.Request.Path;
        var method = context.Request.Method;
        var user = context.User.Claims.FirstOrDefault(claim => claim.Type == System.Security.Claims.ClaimTypes.Email)?.Value;
        var body = await context.Request.GetRawBodyAsync();
        _logger.LogInformation(@$"[{method}] {url}
{(user is not null ? $"    - USER: {user}" : "")}
{(body.IsNullOrEmpty() ? string.Empty : $"    - BODY: {body}")}");
        
        await _next(context);
    }
}