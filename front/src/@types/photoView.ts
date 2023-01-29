export interface reqComment {
  id: string;
  comment: string;
}

export interface resComment {
  comment: string;
  userName: string;
  userID: string;
}

export interface GetPhotos {
  id: string;
}

export interface GetPhotosResponse {
  _id: string;
  image: string;
  title: string;
  likes: Array<string>;
  comments: comments[];
  userID: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

interface comments {
  comment: string;
  userName: string;
  userImage: string | null;
  userID: string;
}

export interface ResponseLike {
  photosId: string;
  userID: string;
}
