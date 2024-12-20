import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, tap} from 'rxjs';
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

  test(){
    return this.http.get('https://jsonplaceholder.typicode.com/albums')
  }

  loadPhotos() {
    if (this.photosSubject.getValue().length) {
      return;
    }
    this.http.get<Photo[]>(this.URL).subscribe(photos => this.photosSubject.next(photos.slice(0, 50)));
  }

  getPhoto(id: number) {
    return this.http.get<Photo>(`${this.URL}/${id}`);
  }

  deletePhoto(id: number) {
    return this.http.delete<Photo>(`${this.URL}/${id}`).pipe(
      tap(() => {
        const photos = this.photosSubject.getValue();
        const filteredPhotos = photos.filter(photo => photo.id !== id);
        this.photosSubject.next(filteredPhotos);
      })
    );
  }
}
