// Interfaces para dados do usuário

export interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  grower?: {
    registerApproved: boolean;
  };
} 