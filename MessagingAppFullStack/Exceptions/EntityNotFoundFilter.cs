using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MessagingAppFullStack.Exceptions;

public class EntityNotFoundFilter : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is not IEntityNotFound) return;
        
        var error = new { error = context.Exception.Message };
        context.Result = new JsonResult(error)
        {
            StatusCode = 404
        };
    }
}