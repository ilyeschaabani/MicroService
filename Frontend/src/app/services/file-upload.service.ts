import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface UploadResponse {
  fileName: string;
  filePath: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

 
  private baseUrl = 'http://localhost:8082/api/upload'; // Update with your backend URL

  constructor(private http: HttpClient) {}
  uploadFile(file: File, fileType: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const uploadUrl = `${this.baseUrl}/${fileType}`;

    return this.http.post<UploadResponse>(uploadUrl, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map(event => this.extractFileName(event)),
      catchError(this.handleError)
    );
  }

  private extractFileName(event: HttpEvent<any>): string {
    if (event.type === HttpEventType.Response) {
      return event.body.fileName; // Extract only the fileName
    }
    return ''; // Default empty string for non-response events
  }

  private handleError(error: any) {
    let errorMsg = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else if (error.status === 413) {
      errorMsg = 'File is too large!';
    } else {
      errorMsg = `Server error: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}
