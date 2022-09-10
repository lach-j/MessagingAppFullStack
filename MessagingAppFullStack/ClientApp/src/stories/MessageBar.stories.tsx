import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MessageBar } from "../components/MessageBar";

export default {
  title: "Messaging/MessageBar",
  component: MessageBar,
  argTypes: {
    onSend: { action: "clicked" },
  },
} as ComponentMeta<typeof MessageBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MessageBar> = (args) => (
  <MessageBar {...args} />
);

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = { isDisabled: true };
