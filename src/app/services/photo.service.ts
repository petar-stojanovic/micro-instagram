import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Photo} from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly URL = 'https://jsonplaceholder.typicode.com/photos';

  private photosSubject = new BehaviorSubject<Photo[]>([]);
  photos$ = this.photosSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  loadPhotos() {
    this.http.get<Photo[]>(this.URL).subscribe(photos => this.photosSubject.next(photos.slice(0, 50)));
  }

  getPhoto(id: number) {
    return this.http.get(`${this.URL}/${id}`);
  }

}
