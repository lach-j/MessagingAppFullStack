using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]

public class MessagingController : ControllerBase
{

    private readonly IMessagingService _messagingService;

    public MessagingController(IMessagingService messagingService)
    {
        _messagingService = messagingService;
    }

    [HttpGet]
    public async Task<IEnumerable<MessageGroup>> GetGroups()
    {
        return await _messagingService.GetMessageGroups();
    }


    [HttpGet]
    [Route("{groupId}")]
    public async Task<IEnumerable<Message>> GetGroupMessage([FromRoute] long groupId)
    {
        Console.WriteLine(groupId);
        return await _messagingService.GetMessagesInGroup(groupId);
    }

    [HttpPost]
    [Route("{groupId}")]
    public async Task<Message> PostGroupMessage([FromBody] MessageReq content, [FromRoute] long groupId)
    {
        return await _messagingService.CreateMessage(groupId, content.Content);
    }
    
    public struct MessageReq
    {
        public string Content { get; set; }        
    }
}