export interface Journal {
    id: number;
    title: string;
    issn: string;
    publisher: string;
    impact_factor: number;
    editor_in_chief: number;
    scope: string;
    website: string;
    publication_frequency: string;
    peer_reviewed: boolean;
    created_at: string;
    updated_at: string;
}