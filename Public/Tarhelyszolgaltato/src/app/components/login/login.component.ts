import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';  // PrimeNG Toast
import { FormsModule } from '@angular/forms';  // Angular Forms
import { MessageService } from 'primeng/api'; // PrimeNG MessageService
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    ToastModule,   // Import ToastModule for toast messages
    FormsModule,  // Import FormsModule for ngModel
    RouterModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]  // Register MessageService to show messages
})
export class LoginComponent {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
  ) {}
  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: ''
  };
  login() {
    this.api.login('users', this.user).subscribe((res: any) => {
      if (res.status(201)) {
        this.messageService.add({ severity: 'success', summary: 'OK', detail: res.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'HIBA', detail: res.message });
      }
    });
  }
}
