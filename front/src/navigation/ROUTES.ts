export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  user: (id: string) => `/users/${id}`,
  profile: "/profile",
  photosView: (id: string) => `/photos/${id}`,
};
