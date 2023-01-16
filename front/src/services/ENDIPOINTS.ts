export const ENDEPOINTS = {
  login: "users/login",
  user: "users/",
  register: "users/register",
  profile: "users/profile",
  photos: "photos/",
  user_id: (id: string) => `users/${id}`,
};
