import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paper } from '../models/Paper';

@Injectable({
  providedIn: 'root'
})
export class ResearchPapersService {
  url = 'http://127.0.0.1:8000/api/research_papers/'

  constructor(private httpClient: HttpClient) { }

  getResearchPaper(id: number): Observable<Paper>{
    return this.httpClient.get<Paper>(this.url + id + "/");
  }

  

  getResearchPapers(): Observable<Paper[]>{
    return this.httpClient.get<Paper[]>(this.url);
  }
  postResearchPapers(paper: Paper): Observable<Paper>{
    console.log("papers: ", paper);
    return this.httpClient.post<Paper>(this.url, paper);
  }
  patchResearchPapers(paper: Paper): Observable<Paper>{
    return this.httpClient.patch<Paper>(this.url + paper.id + "/", paper);
  }
  deleteResearchPapers(paper: Paper): Observable<Paper>{
    return this.httpClient.delete<Paper>(this.url + paper.id + "/");
  }

}
