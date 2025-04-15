export interface Conference {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    organizer: number;
    submission_deadline: string;
    conference_website: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}