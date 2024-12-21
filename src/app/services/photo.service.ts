import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, of, tap, throwError} from 'rxjs';
import {Photo} from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly URL = 'https://jsonplaceholder.typicode.com/photos';

  private photosSubject = new BehaviorSubject<Photo[]>([]);
  photos$ = this.photosSubject.asObservable();
  allPhotos :Photo[] = [];

  constructor(private http: HttpClient) {
  }

  loadPhotos() {
    if (this.photosSubject.getValue().length) {
      return;
    }
    this.http.get<Photo[]>(this.URL).subscribe(photos => {
      this.allPhotos = photos;
      this.photosSubject.next(photos.slice(0, 50))
    });
  }

  getPhoto(id: number) {
    return this.getLocalPhoto(id).pipe(
      catchError(e => {
        return this.http.get<Photo>(`${this.URL}/${id}`);
      })
    );
  }

  getLocalPhoto(id: number) {
    const photo = this.photosSubject.getValue().find(photo => photo.id === id);
    if (photo) {
      return of(photo);
    }
    return throwError(() => new Error('Photo not found'));
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

  addPhoto(photo: Photo) {
    return this.http.post<Photo>(this.URL, photo).pipe(
      tap(newPhoto => {
        const photos = this.photosSubject.getValue();
        this.photosSubject.next([newPhoto, ...photos]);
      })
    );
  }

  updatePhoto(id: number, photo: Photo) {
    const photoToUpdate = this.photosSubject.getValue().find(photo => photo.id === id);
    if (photoToUpdate) {
      const updatedPhoto = {...photoToUpdate, ...photo};
      const updatedPhotos = this.photosSubject.getValue().map(photo => photo.id === id ? updatedPhoto : photo);
      this.photosSubject.next(updatedPhotos);
      return of(updatedPhoto);
    }

    return this.http.put<Photo>(`${this.URL}/${id}`, photo).pipe(
      tap(updatedPhoto => {
        const photoToUpdate = this.photosSubject.getValue().find(photo => photo.id === id);
        if (photoToUpdate) {
          const updatedLocalPhoto = {...photoToUpdate, ...updatedPhoto};
          const updatedPhotos = this.photosSubject.getValue().map(photo => photo.id === id ? updatedLocalPhoto : photo);
          this.photosSubject.next(updatedPhotos);
        }
      })
    );
  }
}
