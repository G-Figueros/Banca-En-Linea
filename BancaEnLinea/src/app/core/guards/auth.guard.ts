export class AuthGuard {
  canActivate(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
