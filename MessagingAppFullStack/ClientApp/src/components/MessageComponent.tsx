import { Avatar, Box, Flex, HStack, Stack } from "@chakra-ui/react";
import { User } from "../models/User";

export interface MessageComponentProps {
  user: User;
  content: string;
  avatarSide?: "left" | "right";
  backgroundColor?: string;
}

export const MessageComponent = ({
  user,
  content,
  avatarSide = "left",
  backgroundColor = "red.100",
}: MessageComponentProps) => {
  return (
    <Flex
      direction={avatarSide === "left" ? "row" : "row-reverse"}
      alignItems="end"
      gap={2}
    >
      <Avatar name={user.name} src={user.avatar} size="sm" />
      <Box
        backgroundColor={backgroundColor}
        px={4}
        py={2}
        rounded={"xl"}
        verticalAlign="middle"
        lineHeight="1.8rem"
      >
        {content}
      </Box>
    </Flex>
  );
};
