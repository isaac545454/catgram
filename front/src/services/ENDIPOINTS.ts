export const ENDEPOINTS = {
  login: "users/login",
  user: "users/",
  register: "users/register",
  profile: "users/profile",
  photos: "photos/",
  photosUser: (id: string) => `photos/user/${id}`,
  deletePhoto: (id: string) => `photos/${id}`,
  user_id: (id: string) => `users/${id}`,
};
// http://localhost:3333/api/photos/63c7cdbab9d495cf4a2f3444
// http://localhost:3333/api/photos/63b01b76b399ec460c5ec9b2
