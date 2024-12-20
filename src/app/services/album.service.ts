import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Album} from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private readonly URL = 'https://jsonplaceholder.typicode.com/albums';


  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Album[]>(this.URL)
  }

  getById(albumId: number) {
    return this.http.get<Album>(`${this.URL}/${albumId}`);
  }
}
