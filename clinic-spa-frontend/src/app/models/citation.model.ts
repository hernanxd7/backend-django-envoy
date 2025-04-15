export interface Citation {
    id: number;
    citing_paper: number;
    cited_paper: number;
    citation_context: string;
    page_number: number;
    citation_date: string;
    impact_score: number;
    created_at: string;
    updated_at: string;
}