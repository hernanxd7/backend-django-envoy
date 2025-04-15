export interface PeerReview {
    id: number;
    paper: number;
    reviewer: number;
    review_text: string;
    rating: number;
    status: 'pending' | 'completed' | 'rejected';
    recommendation: 'accept' | 'revise' | 'reject';
    deadline: string;
    submitted_date: string | null;
    created_at: string;
    updated_at: string;
}