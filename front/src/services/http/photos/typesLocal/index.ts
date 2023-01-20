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
