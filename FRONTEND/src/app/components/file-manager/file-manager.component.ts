import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  files: any[] = []; // Array to store file details
  selectedFile: File | null = null;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  // Load files from the backend
  loadFiles(): void {
    this.fileService.getFiles().subscribe((files: any[]) => {
      this.files = files;
    });
  }

  // Handle file selection for upload
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Upload the selected file
  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.fileService.uploadFile(formData).subscribe({
        next: () => {
          this.loadFiles();
          this.selectedFile = null;
        },
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }

  // Download the selected file
  downloadFile(fileName: string): void {
    this.fileService.downloadFile(fileName).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
