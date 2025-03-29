export const getRedirectUrl = (redirect?: string): string => {
  // Get the dashboard route or fallback to login
  const userDashboard = "/dashboard";

  if (redirect) {
    return redirect;
  }

  return userDashboard;
};
