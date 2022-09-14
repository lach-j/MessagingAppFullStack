import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { GroupSummary } from "../components/GroupSummary";
import { v4 as uuidv4 } from "uuid";

export default {
  title: "Messaging/GroupSummary",
  component: GroupSummary,
} as ComponentMeta<typeof GroupSummary>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GroupSummary> = (args) => (
  <GroupSummary {...args} />
);

const user1 = {
  id: 0,
  firstName: "Lachlan",
  lastName: " Johnson",
  avatar: `https://i.pravatar.cc/150?u=${uuidv4()}`,
};
const user2 = {
  id: 1,
  firstName: "Bob",
  lastName: "Newman",
  avatar: `https://i.pravatar.cc/150?u=${uuidv4()}`,
};

export const Default = Template.bind({});
Default.args = {
  users: [user1, user2],
  displayMessage: {
    user: user2,
    content: "This is the first message",
    timestamp: "2018-06-10T12:11:55.000Z",
  },
  title: "Bob Newman",
};
