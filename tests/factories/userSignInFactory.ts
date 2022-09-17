export default async function userSignInFactory(email: string, password: string) {
  return {
    email,
    password,
  };
}
