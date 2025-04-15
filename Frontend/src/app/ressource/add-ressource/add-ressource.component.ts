import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryRessource, Ressource, TypeRessource } from '../../Models/ressource.model';
import { RessourceService } from '../../services/ressource-service.service';
import { FileUploadService } from '../../services/file-upload.service';
  
@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent implements OnChanges {
  @Output() resourceUpdated = new EventEmitter<Ressource>(); // Notify parent

  @Input() selectedResource!: Ressource | null;

  // Initialize ressource with default values
  ressource: Ressource = {
    titre: '',
    description: '',
    type: TypeRessource.DOCUMENT, // Default type
    date: new Date(),
    category: CategoryRessource.OTHER, // Default category
    fileName: '', // Default filename
  };

  types = Object.values(TypeRessource);
  categories = Object.values(CategoryRessource);

  successMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | null = null;
  uploadMessage: string | null = null;

  constructor(
    private service: RessourceService,
    private fileUploadService: FileUploadService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  // ngOnChanges will be triggered whenever @Input() selectedResource changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedResource']) {
      this.ressource = changes['selectedResource'].currentValue || {
        titre: '',
        description: '',
        type: TypeRessource.DOCUMENT,
        date: new Date(),
        category: CategoryRessource.OTHER,
        fileName: ''
      };
      this.cdr.detectChanges(); // Ensure that Angular detects changes when the input changes
    }
  }
  onSubmit(): void {
    console.log(this.ressource);

    if(this.selectedResource!=null){
      //update 
      this.service.update(this.selectedResource.idRessource||"",this.ressource).subscribe({
        next: () => {
          this.successMessage = 'Ressource ajoutée avec succès';
          this.resetForm();
        this.resourceUpdated.emit(); // Emit event to parent
  
        },
        error: () => {
          this.successMessage = '';
          this.errorMessage = 'Erreur lors de l\'ajout de la ressource';
        }
      })
    }else {
      this.service.create(this.ressource).subscribe({
        next: () => {
          this.successMessage = 'Ressource ajoutée avec succès';
          this.resetForm();
        this.resourceUpdated.emit(); // Emit event to parent
  
        },
        error: () => {
          this.successMessage = '';
          this.errorMessage = 'Erreur lors de l\'ajout de la ressource';
        }
      });
    }
    
  }
  
  resetForm(): void {
    this.ressource = { 
       titre: '', 
      description: '', 
      type: TypeRessource.DOCUMENT, 
      date: new Date(), 
      category: CategoryRessource.OTHER 
    };
    this.successMessage = '';
    this.errorMessage = '';
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a file first!';
      return;
    }

    this.fileUploadService.uploadFile(this.selectedFile, this.ressource.type).subscribe(
      (fileName) => {
        console.log(fileName)
        this.ressource.fileName = fileName;
        this.uploadMessage = 'File uploaded successfully!';
      },
      (error) => {
        this.uploadMessage = error.message;
      }
    );
  }
  onTypeChange() {
    console.log('Type changed to:', this.ressource.type);

    this.ressource.fileName = '';  // Reset the fileName
    this.selectedFile = null;      // Reset the selected file
     this.uploadMessage = null;     // Reset the upload message
    this.cdr.detectChanges();

  }
}
