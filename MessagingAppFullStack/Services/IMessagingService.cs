﻿using MessagingAppFullStack.Domain.Models;

namespace MessagingAppFullStack.Services;

public interface IMessagingService
{
    Task<IEnumerable<Message>> GetMessagesInGroup(long messageGroupId);
    Task<Message> CreateMessage(long messageGroupId, string content);
}