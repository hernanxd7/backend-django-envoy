
export interface Paper {
  id: number;
  title: string;
  authors: string[];
  abstract: string;
  keywords: string[];
  topics: string[];
  citations: number;
  year: number;
  doi: string;
  link: string;
}