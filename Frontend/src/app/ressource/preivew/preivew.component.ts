import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ressource } from '../../Models/ressource.model';
import { RessourceService } from '../../services/ressource-service.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-preivew',
  templateUrl: './preivew.component.html',
  styleUrls: ['./preivew.component.css']
})

export class PreivewComponent implements OnInit {
idResource:string="";
ressource:Ressource |null=null;
lienRessource:string="";
isViewDoc:boolean=false;
apikey="public_W23MT7Y21rQSSvbMeJ7nnYNgZFKd"
constructor(private route: ActivatedRoute,private ressourceService:RessourceService,private http:HttpClient) {}

  ngOnInit(): void {
  this.idResource = this.route.snapshot.paramMap.get('id') || '';
  this.ressourceService.getById(this.idResource).subscribe((data) => {
    this.ressource = data;
    this.handlePreviewLogic();

    
   });
}
handlePreviewLogic(): void {
  if (!this.ressource) return;

  const extension = this.ressource.fileName?.split('.').pop()?.toLowerCase();
  const backendUrl = `http://localhost:8082/api/download/${this.ressource.type}/${this.ressource.fileName}`;

  if (extension === 'docx') {
    // Upload the document to Bytescale and get the URL
    this.uploadFileToBytescale(backendUrl).then((url) => {
      console.log(url+".docx")
       this.lienRessource = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url+".docx")}`;
      this.isViewDoc = true;
    }).catch((error) => {
      console.error("Error uploading file to Bytescale:", error);
    });
  } else {
    this.lienRessource = backendUrl;
  }
}
uploadFileToBytescale(fileUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((fileBlob: Blob) => {
      formData.append('file', fileBlob, 'file-to-upload');
      this.http.post('https://api.bytescale.com/v2/accounts/W23MT7Y/uploads/binary', formData, {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
          'Authorization':`Bearer ${this.apikey}`
        })

      }).subscribe(
        (response: any) => {
          // Assuming the response contains a URL to the uploaded file
          resolve(response.fileUrl);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
}

}
