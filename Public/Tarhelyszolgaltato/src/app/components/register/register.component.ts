import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';  // Correct import for MessageService
import { User } from '../../../interfaces/user'; // Assuming User is an interface defined in your project
import { ToastModule } from 'primeng/toast'; // Import ToastModule to show messages
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]  // Register MessageService to show messages
})
export class RegisterComponent {
  user: User = {
    id: '',
    name: '',
    email: '',
    passwd: '',
    confirm: '',
    role: ''
  };

  invalidFields: string[] = [];

  constructor(
    private api: ApiService,
    private messageService: MessageService // Inject MessageService to show toast
  ) {}

  registration() {
    this.api.registration('users', this.user).subscribe((res: any) => {
      this.invalidFields = res.invalid;

      if (this.invalidFields.length === 0) {
        // Success message using Toast
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: res.message
        });

        // Clear form after successful registration
        this.resetForm();
      } else {
        // Error message using Toast
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: res.message
        });
      }
    });
  }

  resetForm() {
    this.user = {
      id: '',
      name: '',
      email: '',
      passwd: '',
      confirm: '',
      role: ''
    };
  }
}
