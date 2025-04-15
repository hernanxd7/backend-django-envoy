import { createAction, props } from '@ngrx/store';
import { PeerReview } from '../models/peer-review.model';

export const loadPeerReviews = createAction('[PeerReviews] Load PeerReviews');
export const loadPeerReviewsSuccess = createAction(
  '[PeerReviews] Load PeerReviews Success',
  props<{ peerReviews: PeerReview[] }>()
);
export const loadPeerReviewsFailure = createAction(
  '[PeerReviews] Load PeerReviews Failure',
  props<{ error: string }>()
);