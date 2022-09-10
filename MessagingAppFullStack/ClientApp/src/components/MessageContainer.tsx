import {VStack} from "@chakra-ui/react";
import {MessageComponentProps} from "./MessageComponent";
import {User} from "../models/User";
import React from "react";

interface MessageContainerProps {
    children: React.ReactElement<MessageComponentProps> | React.ReactElement<MessageComponentProps>[];
    activeUser: User;
}

export const MessageContainer = ({children, activeUser}: MessageContainerProps) => {
    
    return (
     <VStack alignItems={'stretch'}>
         {React.Children.map(children, child => {
             const fromActiveUser = child.props.user.id === activeUser.id;
             return (
                 React.cloneElement(child as React.ReactElement<MessageComponentProps>, {
                     ...child.props,
                     avatarSide: fromActiveUser ? 'right' : 'left',
                     backgroundColor: fromActiveUser ? 'red.100' : 'blue.100'
                 })
             )
         })}
     </VStack>  
   ); 
}