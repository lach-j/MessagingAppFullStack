import { HStack, IconButton, Input} from "@chakra-ui/react";
import React from "react";
import {BiPaperPlane} from "react-icons/all";

interface MessageBarProps {
    onSend: (messageContent: string) => void;
}

export const MessageBar = ({ onSend }: MessageBarProps) => {
    
    const [messageContent, setMessageContent] = React.useState<string>("");
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageContent(e.target.value);
    }
    
    const handleSendMessage = () => {
        if (!messageContent) return;
        
        onSend(messageContent);
        setMessageContent("");
    }
    
    return (
      <HStack>
          <Input value={messageContent} onChange={handleInput} />
          <IconButton colorScheme={'blue'} icon={<BiPaperPlane />} aria-label={'Send message'} onClick={handleSendMessage} />
      </HStack>  
    );
}