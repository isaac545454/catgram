export const ROUTES = {
  home: "/",
  login: "/",
  register: "/register",
  user: (id: string) => `/users/${id}`,
  profile: "/profile",
  photosView: (id: string) => `/photos/${id}`,
  search: (search: string) => `/filter/${search}`,
};
