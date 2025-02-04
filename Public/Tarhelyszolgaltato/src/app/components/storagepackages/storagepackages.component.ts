import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StoragePackage } from '../../../interfaces/storage-package';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';  
import { CardModule } from 'primeng/card';    
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-storagepackages',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './storagepackages.component.html',
  styleUrls: ['./storagepackages.component.scss'],
  providers: [MessageService]  
})
export class StoragePackagesComponent implements OnInit {
  storages: any[] = [];

  constructor(private api: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.kapdmeg();
  }

  kapdmeg() {
    this.api.getStoragePackages().subscribe(
      (response: any) => {
        if (response.success) {
          this.storages = response.storages;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Hiba',
            detail: 'Nem sikerült betölteni a tároló csomagokat.'
          });
        }
      },
      (error) => {
        console.error('Hiba történt a tároló csomagok betöltésekor', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Hiba',
          detail: 'Hiba történt a betöltés során.'
        });
      }
    );
  }
  
  subscribeToPackage(storageId: string) {
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Előfizetés', 
      detail: `Előfizettél a ${storageId} csomagra!` 
    });
  }
  
}
