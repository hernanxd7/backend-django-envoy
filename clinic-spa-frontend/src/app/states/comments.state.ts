import { Comment } from '../models/comment.model';

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  loaded: boolean;  // Track if data has been loaded
  error: string | null;
}

export const initialCommentsState: CommentsState = {
  comments: [],
  loading: false,
  loaded: false,  // Initially false
  error: null
};
