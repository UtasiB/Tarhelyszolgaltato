import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StoragePackage } from '../../../interfaces/storage-package';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';  // A táblázat komponens importálása
import { DialogModule } from 'primeng/dialog'; // A dialógus importálása
import { InputTextModule } from 'primeng/inputtext'; // Az input mező importálása
import { FormsModule } from '@angular/forms'; // Az ngModel használatához szükséges

@Component({
  selector: 'app-storage-management',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FormsModule,  // Az ngModel adatbindhoz
  ],
  templateUrl: './storage-management.component.html',
  styleUrls: ['./storage-management.component.scss']
})
export class StorageManagementComponent implements OnInit {
  storages: StoragePackage[] = [];
  newStorage: StoragePackage = { id: '', name: '', price: 0, description: '', createdAt: '', updatedAt: '' };
  displayDialog: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getStorages();
  }

  getStorages() {
    this.apiService.getStoragePackages().subscribe((data: any) => {
      this.storages = data.storages;
    });
  }

  addStorage() {
    this.apiService.createStorage(this.newStorage).subscribe(response => {
      this.getStorages();
      this.displayDialog = false;
    });
  }

  deleteStorage(storageId: string) {
    this.apiService.deleteStorage(storageId).subscribe(response => {
      this.getStorages();
    });
  }

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }
}
