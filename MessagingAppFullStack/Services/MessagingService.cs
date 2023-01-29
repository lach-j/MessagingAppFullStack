using MessagingAppFullStack.Domain.Context;
using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Exceptions;
using MessagingAppFullStack.SignalR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Services;

public class MessagingService : IMessagingService
{
    private readonly EfCoreContext _db = new();
    private readonly IHubContext<MessagesHub, IMessagesHub> _hub;

    public MessagingService(IHubContext<MessagesHub, IMessagesHub> hub)
    {
        _hub = hub;
    }

    public async Task<IEnumerable<Message>> GetMessagesInGroup(long messageGroupId)
    {
        var group = await _db.MessageGroups.Include(mg => mg.Messages)
            .FirstOrDefaultAsync(mg => mg.Id == messageGroupId);

        if (group == null)
            throw new EntityNotFoundException<MessageGroup>(messageGroupId);

        return group.Messages;
    }

    public async Task<Message> CreateMessage(long messageGroupId, string content)
    {
        var messageGroup = _db.MessageGroups.FirstOrDefault(mg => mg.Id == messageGroupId);
        var user = _db.Users.FirstOrDefault(usr => usr.Id == 15L);
        if (messageGroup == null)
            throw new EntityNotFoundException<Message>(messageGroupId);

        if (user == null)
            throw new EntityNotFoundException<User>(15L);

        var message = new Message()
        {
            Content = content,
            Timestamp = DateTime.UtcNow,
            MessageGroup = messageGroup,
            User = user
        };

        _db.Messages.Add(message);

        await _db.SaveChangesAsync();
        return message;
    }
}