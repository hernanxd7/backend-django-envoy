import { PeerReview } from '../models/peer-review.model';

export interface PeerReviewsState {
  peerReviews: PeerReview[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialPeerReviewsState: PeerReviewsState = {
  peerReviews: [],
  loading: false,
  loaded: false,
  error: null
};