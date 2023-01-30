using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagingController : ControllerBase
{

    private readonly IMessagingService _messagingService;

    public MessagingController(IMessagingService messagingService)
    {
        _messagingService = messagingService;
    }

    [HttpGet]
    [Route("{groupId}")]
    public async Task<IEnumerable<Message>> Get([FromRoute] long groupId)
    {
        Console.WriteLine(groupId);
        return await _messagingService.GetMessagesInGroup(groupId);
    }

    [HttpPost]
    [Route("{groupId}")]
    [Authorize]
    public async Task<Message> Post([FromBody] MessageReq content, [FromRoute] long groupId)
    {
        return await _messagingService.CreateMessage(groupId, content.Content);
    }
    
    public struct MessageReq
    {
        public string Content { get; set; }        
    }
}