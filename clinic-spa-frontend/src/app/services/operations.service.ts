import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import { Comment } from '../models/comment.model';


@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private getUrlComments = "https://us-central1-nr-software.cloudfunctions.net/practica1/comments";

  constructor(
    private http: HttpClient
  ) { }

  getComments(): Observable<Comment[]>{
    console.log("fetching comments from API");
    return this.http.get<Comment[]>(this.getUrlComments);
  }
}
