export interface AuthenticatedUserDTO {
  username: string;
  isAuthenticated: boolean;
  roles: string[];
}
