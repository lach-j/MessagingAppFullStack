import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MessageComponent } from "../components/MessageComponent";

export default {
  title: "Messaging/MessageComponent",
  component: MessageComponent,
} as ComponentMeta<typeof MessageComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MessageComponent> = (args) => (
  <MessageComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: {
    id: 0,
    name: "Lachlan Johnson",
    avatar: "https://source.unsplash.com/random/300×300",
  },
  avatarSide: "left",
  content: "Hello my name is Lachlan",
  backgroundColor: "blue.100",
};
