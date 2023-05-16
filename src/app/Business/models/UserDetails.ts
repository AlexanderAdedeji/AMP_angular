export interface AuthUserDetails {
        email: string;
        user_type: {
          name: string;
          id: number;
        };
        token: string
      
}