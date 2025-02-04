import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast'; 
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    ToastModule, 
    FormsModule, 
    RouterModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]  
})
export class LoginComponent {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private router: Router
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
    this.api.login('users', this.user).subscribe(
      (res: any) => {
        if (res && res.token) {
          localStorage.setItem('tarhelyszolgaltato', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Bejelentkezés sikeres!' });
          this.router.navigate(['/storagepackages']); 
        } else {
          this.messageService.add({ severity: 'error', summary: 'HIBA', detail: 'Nem sikerült a bejelentkezés!' });
        }
      },
      (error) => {
        console.error('Hiba történt:', error);
        this.messageService.add({ severity: 'error', summary: 'HIBA', detail: 'Nem sikerült a bejelentkezés. Próbálja újra!' });
      }
    );
  } 
}