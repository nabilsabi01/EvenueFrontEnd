import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { CommonModule } from '@angular/common';
import {UserService} from "../../services/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
  allUsers: User[] = [];

  constructor(private _UserService: AdminServiceService) {
  }

  ngOnInit(): void {
    this._UserService.getAllUsers().subscribe({
      next: (res: User[]) => {
        this.allUsers = res;

      },
    });
  }

  deleteUser(id:number){
    this._UserService.deleteEvent(id).subscribe({
      next:(_res)=>{
        this._UserService.getAllUsers().subscribe({
          next: (res) => {
            this.allUsers = res;
          },
        });
      }
    });
  }
}


