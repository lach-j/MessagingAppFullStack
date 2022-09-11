import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import { MessageContainer } from "../components/MessageContainer";
import { Message } from "../models/Message";
import { MessageComponent } from "../components/MessageComponent";

export default {
  title: "Messaging/MessageContainer",
  component: MessageContainer,
} as ComponentMeta<typeof MessageContainer>;

const user1 = {
  id: 0,
  name: "Lachlan Johnson",
  avatar: `https://i.pravatar.cc/150?u=${uuidv4()}`,
};
const user2 = {
  id: 1,
  name: "Bob Newman",
  avatar: `https://i.pravatar.cc/150?u=${uuidv4()}`,
};

const messages: Message[] = [
  {
    user: user2,
    content: "This is the first message",
    timestamp: "2018-06-10T12:11:55.000Z",
  },
  {
    user: user1,
    content: "This is the first message",
    timestamp: "2018-06-10T12:12:55.000Z",
  },
  {
    user: user2,
    content: "This is the first message",
    timestamp: "2018-06-10T12:15:55.000Z",
  },
  {
    user: user2,
    content: "This is the first message",
    timestamp: "2018-06-10T12:40:55.000Z",
  },
  {
    user: user2,
    content: "This is the first message",
    timestamp: "2018-06-10T13:41:55.000Z",
  },
  {
    user: user2,
    content: "This is the first message",
    timestamp: "2018-06-11T10:12:55.000Z",
  },
];

const Template: ComponentStory<typeof MessageComponent> = (args) => (
  <MessageContainer activeUser={user1}>
    {messages.map(({ user, content, timestamp }) => (
      <MessageComponent user={user} content={content} timestamp={timestamp} />
    ))}
  </MessageContainer>
);

export const Default = Template.bind({});
