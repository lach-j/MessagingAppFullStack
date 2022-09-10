import { Avatar, Box, Flex } from "@chakra-ui/react";
import { User } from "../models/User";

export interface MessageComponentProps {
  user: User;
  content: string;
  avatarSide?: "left" | "right";
  backgroundColor?: string;
  avatarIsVisible?: boolean;
  timestamp?: string;
}

export const MessageComponent = ({
  user,
  content,
  avatarSide = "left",
  backgroundColor = "red.100",
  avatarIsVisible = true,
  timestamp,
}: MessageComponentProps) => {
  return (
    <Flex
      direction={avatarSide === "left" ? "row" : "row-reverse"}
      alignItems="end"
      gap={2}
    >
      {avatarIsVisible ? (
        <Avatar name={user.name} src={user.avatar} size="sm" />
      ) : (
        <Box w={8} />
      )}
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
