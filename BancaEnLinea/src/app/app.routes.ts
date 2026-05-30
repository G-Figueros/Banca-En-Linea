export const appRoutes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: 'LoginComponent' },
  { path: 'user-dashboard', component: 'UserDashboardComponent' },
  { path: 'admin-dashboard', component: 'AdminDashboardComponent' }
];
