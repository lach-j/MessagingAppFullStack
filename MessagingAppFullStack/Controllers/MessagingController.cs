using MessagingAppFullStack.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MessagingAppFullStack.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagingController : ControllerBase
{
    [HttpGet]
    public IEnumerable<Message> Get()
    {
        return new List<Message>()
        {
            new Message()
            {
                Content = "test123",
                Id = 1L,
                Timestamp = DateTime.UtcNow
            },
            new Message()
            {
                Content = "oppopop",
                Id = 2L,
                Timestamp = DateTime.UtcNow + TimeSpan.FromMinutes(5)
            }
        };
    }

    [HttpPost]
    public Message Post([FromBody] MessageReq content)
    {
        return new Message()
        {
            Content = content.Content,
            Id = 3L,
            Timestamp = DateTime.UtcNow
        };
    }
    
    public struct MessageReq
    {
        public string Content { get; set; }        
    }
}