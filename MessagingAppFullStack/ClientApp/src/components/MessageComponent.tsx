import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { User } from "../models/User";
import moment from "moment";

export interface MessageComponentProps {
  user: User;
  content: string;
  avatarSide?: "left" | "right";
  backgroundColor?: "red" | "blue" | "purple" | "green";
  avatarIsVisible?: boolean;
  timestampIsVisible?: boolean;
  timestamp?: string;
}

export const MessageComponent = ({
  user,
  content,
  avatarSide = "left",
  backgroundColor = "red",
  avatarIsVisible = true,
  timestamp,
  timestampIsVisible = true,
}: MessageComponentProps) => {
  const timeFromNow = moment(timestamp).fromNow();

  const bgColor = useColorModeValue(
    `${backgroundColor}.100`,
    `${backgroundColor}.500`
  );

  return (
    <Flex direction={avatarSide === "left" ? "row" : "row-reverse"}>
      <VStack>
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
          <Popover
            placement={avatarSide === "left" ? "right" : "left"}
            trigger="hover"
          >
            <PopoverTrigger>
              <Box
                backgroundColor={bgColor}
                px={4}
                py={2}
                rounded={"xl"}
                verticalAlign="middle"
                lineHeight="1.8rem"
              >
                {content}
              </Box>
            </PopoverTrigger>
            <PopoverContent w={"fit-content"}>
              <PopoverArrow />
              <PopoverBody>
                {moment.utc(timestamp).local().format("DD/MM/yyyy HH:mm")}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        {timestampIsVisible && (
          <Text alignSelf={avatarSide === "left" ? "end" : "start"}>
            {timeFromNow}
          </Text>
        )}
      </VStack>
    </Flex>
  );
};
