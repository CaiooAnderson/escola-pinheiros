export const loginService = (email: string, password: string): boolean => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Credenciais do administrador não cadastradas na .env");
  }

  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
};