import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MessageContainer } from "../components/MessageContainer";
import { Message } from "../models/Message";
import { MessageComponent } from "../components/MessageComponent";

export default {
  title: "Messaging/MessageContainer",
  component: MessageContainer,
} as ComponentMeta<typeof MessageContainer>;

export const Default = () => {
  const user1 = {
    id: 0,
    name: "Lachlan Johnson",
    avatar: "https://thispersondoesnotexist.com/image",
  };
  const user2 = {
    id: 1,
    name: "Bob Newman",
    avatar: "https://source.unsplash.com/random/300×300",
  };

  const messages: Message[] = [
    {
      user: user2,
      content: "This is the first message",
      timestamp: "2018-06-13T12:11:55.000Z",
    },
    {
      user: user1,
      content: "This is the first message",
      timestamp: "2018-06-13T12:12:55.000Z",
    },
    {
      user: user2,
      content: "This is the first message",
      timestamp: "2018-06-13T13:11:55.000Z",
    },
    {
      user: user2,
      content: "This is the first message",
      timestamp: "2018-06-10T10:11:55.000Z",
    },
  ];

  return (
    <MessageContainer activeUser={user1}>
      {messages.map(({ user, content, timestamp }) => (
        <MessageComponent user={user} content={content} />
      ))}
    </MessageContainer>
  );
};
