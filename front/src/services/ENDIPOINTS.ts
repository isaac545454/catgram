export const ENDEPOINTS = {
  login: "users/login",
  user: "users/",
  register: "users/register",
  profile: "users/profile",
  photos: "photos/",
  photosUser: (id: string) => `photos/user/${id}`,
  deletePhoto: (id: string) => `photos/${id}`,
  user_id: (id: string) => `users/${id}`,
  like: (id: string) => `photos/like/${id}`,
  comment: (id: string) => `photos/comment/${id}`,
};
