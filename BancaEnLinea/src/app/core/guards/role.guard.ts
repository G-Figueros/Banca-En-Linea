export class RoleGuard {
  constructor(private requiredRole: string) {}

  canActivate(userRole: string): boolean {
    return userRole === this.requiredRole;
  }
}
