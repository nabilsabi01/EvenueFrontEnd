import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../interface/event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-allevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-allevents.component.html',
  styleUrl: './admin-allevents.component.css'
})

export class AdminAlleventsComponent  implements OnInit {
  allEvents:Event[] = [];
  constructor(private _EventService: EventService) {}
  ngOnInit(): void {
    this._EventService.getAllEvents().subscribe({
      next: (res: Event[]) => {
        this.allEvents = res;
      },
      error: (err) => console.error('Error fetching events:', err)
    });
  }

  // deleteEvent(id:string){
  //   this._EventService.deleteEvent(id).subscribe({
  //     next:(res)=>{
  //       if(res.message=='success'){
  //         this._EventService.getEvents().subscribe({
  //           next: (res) => {
  //             if (res.message == 'success') {
  //               this.allEvents = res.data;
  //             }
  //           },
  //         });
  //       }
  //     }
  //   });
  // }
}
