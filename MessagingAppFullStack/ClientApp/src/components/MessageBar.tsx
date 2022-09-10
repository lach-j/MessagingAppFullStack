import {HStack, IconButton, Input, Textarea} from "@chakra-ui/react";
import React from "react";
import {BiPaperPlane} from "react-icons/all";

interface MessageBarProps {
    onSend: (messageContent: string) => void;
}

export const MessageBar = ({ onSend }: MessageBarProps) => {
    
    const [messageContent, setMessageContent] = React.useState<string>("");
    
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value);
    }
    
    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.shiftKey) return;
        
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    }
    
    const handleSendMessage = () => {
        if (!messageContent) return;
        
        onSend(messageContent.trim());
        setMessageContent("");
    }
    
    return (
      <HStack>
          <Textarea resize={'none'} value={messageContent} onChange={handleInput} onKeyDown={handleInputKeyDown} />
          <IconButton colorScheme={'blue'} icon={<BiPaperPlane />} aria-label={'Send message'} onClick={handleSendMessage} />
      </HStack>  
    );
}