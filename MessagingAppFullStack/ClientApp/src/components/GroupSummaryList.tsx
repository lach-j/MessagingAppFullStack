import React from "react";
import { GroupSummaryProps } from "./GroupSummary";
import { Box } from "@chakra-ui/react";

export interface GroupSummaryListProps {
  children:
    | React.ReactElement<GroupSummaryProps>
    | React.ReactElement<GroupSummaryProps>[];
}

export const GroupSummaryList = (props: GroupSummaryListProps) => {
  return <Box overflowY="auto">{props.children}</Box>;
};
