import {HStack, IconButton, Input, Textarea} from "@chakra-ui/react";
import React from "react";
import {BiPaperPlane} from "react-icons/all";

interface MessageBarProps {
    onSend: (messageContent: string) => void;
}

export const MessageBar = ({ onSend }: MessageBarProps) => {
    const [messageContent, setMessageContent] = React.useState<string>("");

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    React.useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + 2 + "px";
        }
    }, [messageContent]);
    
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
      <HStack alignItems={'end'}>
          <Textarea ref={textareaRef} h={10} minH={10} maxH={32} resize={'none'} value={messageContent} onChange={handleInput} onKeyDown={handleInputKeyDown} />
          <IconButton colorScheme={'blue'} icon={<BiPaperPlane />} aria-label={'Send message'} onClick={handleSendMessage} />
      </HStack>  
    );
}