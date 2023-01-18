export const ENDEPOINTS = {
  login: "users/login",
  user: "users/",
  register: "users/register",
  profile: "users/profile",
  photos: "photos/",
  photosUser: (id: string) => `photos/user/${id}`,
  user_id: (id: string) => `users/${id}`,
};
