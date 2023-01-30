using MessagingAppFullStack.Domain.Models;

namespace MessagingAppFullStack.SignalR;

public interface IMessagesHub
{
    Task NewMessage(long groupId, Message message);
    Task UpdateMessage(Message message);
    Task DeleteMessage(long messageId);
}