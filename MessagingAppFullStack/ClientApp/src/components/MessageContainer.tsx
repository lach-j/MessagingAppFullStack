import { VStack } from "@chakra-ui/react";
import { MessageComponentProps } from "./MessageComponent";
import { User } from "../models/User";
import React from "react";
import { groupBy } from "../util/groupBy";

interface MessageContainerProps {
  children:
    | React.ReactElement<MessageComponentProps>
    | React.ReactElement<MessageComponentProps>[];
  activeUser: User;
}

export const MessageContainer = ({
  children,
  activeUser,
}: MessageContainerProps) => {
  let elements = React.Children.toArray(children);

  let groups = groupBy(elements, (a, b) =>
    React.isValidElement<MessageComponentProps>(a) &&
    React.isValidElement<MessageComponentProps>(b)
      ? a.props.user.id === b.props.user.id
      : false
  );

  return (
    <VStack alignItems={"stretch"}>
      {groups.map((group) =>
        React.Children.map(group, (child, index) => {
          if (!React.isValidElement<MessageComponentProps>(child)) return;
          const fromActiveUser = child.props.user.id === activeUser.id;
          const isLastElement = index === group.length - 1;
          return React.cloneElement(
            child as React.ReactElement<MessageComponentProps>,
            {
              ...child.props,
              avatarIsVisible: isLastElement,
              avatarSide: fromActiveUser ? "right" : "left",
              backgroundColor: fromActiveUser ? "red.100" : "blue.100",
            }
          );
        })
      )}
    </VStack>
  );
};
