import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { GroupSummaryList } from "../components/GroupSummaryList";
import { v4 as uuidv4 } from "uuid";
import { GroupSummary } from "../components/GroupSummary";

export default {
  title: "Messaging/GroupSummaryList",
  component: GroupSummaryList,
} as ComponentMeta<typeof GroupSummaryList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GroupSummaryList> = (args) => (
  <GroupSummaryList>
    {summaries.map(({ users, displayMessage, title }) => (
      <GroupSummary
        users={users}
        displayMessage={displayMessage}
        title={title}
        isActive={false}
      />
    ))}
  </GroupSummaryList>
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

const summaries = [
  {
    users: [user1, user2],
    displayMessage: {
      user: user2,
      content: "This is the first message",
      timestamp: "2018-06-10T12:11:55.000Z",
    },
    title: "Bob Newman",
  },
  {
    users: [user1, user2],
    displayMessage: {
      user: user2,
      content: "This is the first message",
      timestamp: "2018-06-10T12:11:55.000Z",
    },
    title: "Bob Newman",
  },
  {
    users: [user1, user2],
    displayMessage: {
      user: user2,
      content: "This is the first message",
      timestamp: "2018-06-10T12:11:55.000Z",
    },
    title: "Bob Newman",
  },
];

export const Default = Template.bind({});
