import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { MessageComponentProps } from "./MessageComponent";
import { User } from "../models/User";
import React from "react";
import moment from "moment";

import "../util/arrayExtensions";

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

  let dateGroups = elements.groupBy((a, b) =>
    React.isValidElement<MessageComponentProps>(a) &&
    React.isValidElement<MessageComponentProps>(b)
      ? moment(a.props.timestamp).isSame(moment(b.props.timestamp), "date")
      : false
  );

  return (
    <VStack alignItems={"stretch"}>
      {dateGroups.map((group) => {
        let userGroups = group.groupBy((a, b) =>
          React.isValidElement<MessageComponentProps>(a) &&
          React.isValidElement<MessageComponentProps>(b)
            ? a.props.user.id === b.props.user.id
            : false
        );

        return (
          <>
            <HStack>
              <Divider />
              <Text whiteSpace="nowrap">
                {React.isValidElement<MessageComponentProps>(group[0])
                  ? moment(group[0].props.timestamp)
                      .local()
                      .format("DD/MM/yyyy")
                  : ""}
              </Text>
              <Divider />
            </HStack>
            {userGroups.map((userGroup) =>
              React.Children.map(userGroup, (child, index) => {
                if (!React.isValidElement<MessageComponentProps>(child)) return;
                const fromActiveUser = child.props.user.id === activeUser.id;
                const isLastElement = index === userGroup.length - 1;
                return React.cloneElement(
                  child as React.ReactElement<MessageComponentProps>,
                  {
                    ...child.props,
                    avatarIsVisible: isLastElement,
                    avatarSide: fromActiveUser ? "right" : "left",
                    backgroundColor: fromActiveUser ? "red" : "blue",
                  }
                );
              })
            )}
          </>
        );
      })}
    </VStack>
  );
};
