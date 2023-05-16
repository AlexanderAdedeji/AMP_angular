export interface AgentDetails{
    email: string;
    name: string;
    address: string;
    user_type: {
      name: string;
      id: number;
    };
    token: string
  }