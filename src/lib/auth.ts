export function checkAuth(password: string): boolean {
  const secret = process.env.ADMIN_PASSWORD || 'admin';
  return password === secret;
}
