import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../../interfaces/user';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    CardModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  subscription: any = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProfile().subscribe(
      (res: any) => {
        this.user = res.user;
        this.subscription = res.subscription;
      },
      (error) => {
        console.error('Error fetching profile', error);
      }
    );
  }
}
