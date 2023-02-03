using MessagingAppFullStack.Domain.Context;
using MessagingAppFullStack.Domain.Models;
using MessagingAppFullStack.Exceptions;
using MessagingAppFullStack.Middleware;
using MessagingAppFullStack.SignalR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace MessagingAppFullStack.Services;

public class MessagingService : IMessagingService
{
    private readonly EfCoreContext _db;
    private readonly IHubContext<MessagesHub, IMessagesHub> _hub;
    private readonly IUserProvider _userProvider;

    public MessagingService(IHubContext<MessagesHub, IMessagesHub> hub, IUserProvider userProvider, EfCoreContext db)
    {
        _hub = hub;
        _userProvider = userProvider;
        _db = db;
    }

    public async Task<IEnumerable<Message>> GetMessagesInGroup(long messageGroupId)
    {
        var group = await _db.MessageGroups.Include(mg => mg.Messages)
            .FirstOrDefaultAsync(mg => mg.Id == messageGroupId);

        if (group == null)
            throw new EntityNotFoundException<MessageGroup>(messageGroupId);

        return group.Messages;
    }

    public async Task<IEnumerable<MessageGroup>> GetMessageGroups()
    {
        var currentUser = await _userProvider.GetCurrentUserAsync();

        var userGroups = _db.MessageGroups.Include(mg => mg.ActiveUsers).Where(mg => mg.ActiveUsers.Any(u => u == currentUser));

        return await userGroups.ToListAsync();
    }

    public async Task<Message> CreateMessage(long messageGroupId, string content)
    {
        var messageGroup = _db.MessageGroups.FirstOrDefault(mg => mg.Id == messageGroupId);

        var userId = _userProvider.GetUserId();

        if (userId is null)
            throw new UnauthorizedAccessException($"{nameof(userId)} could not be provided by {nameof(UserProvider)}");

        var user = _db.Users.FirstOrDefault(usr => usr.Id == userId);
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
        await _hub.Clients.All.NewMessage(messageGroupId, message);

        return message;
    }
}