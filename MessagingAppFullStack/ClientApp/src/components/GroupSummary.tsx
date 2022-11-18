import { User } from "../models/User";
import { Message } from "../models/Message";
import {
  Avatar,
  AvatarGroup,
  Box,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export interface GroupSummaryProps {
  users: User[];
  displayMessage: Message;
  title: string;
  isActive: boolean;
}

export const GroupSummary = ({
  users,
  title,
  displayMessage,
  isActive,
}: GroupSummaryProps) => {
  const backgroundColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      _hover={{
        backgroundColor,
      }}
      p={3}
      rounded={"md"}
      backgroundColor={isActive ? backgroundColor : "inherit"}
    >
      <HStack>
        <AvatarGroup>
          {users.map((user) => (
            <Avatar
              name={`${user.firstName} ${user.lastName}`}
              src={user.avatar}
              size="sm"
            />
          ))}
        </AvatarGroup>
        <VStack alignItems={"start"}>
          <Text fontWeight={"bold"}>{title}</Text>
          <Text fontSize={"sm"}>
            <span>{`${displayMessage.user.firstName}: `}</span>
            {displayMessage.content}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};
