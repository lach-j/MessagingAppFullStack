﻿import { User } from "./User";

export interface Message {
  user: User;
  content: string;
  timestamp: string;
}
