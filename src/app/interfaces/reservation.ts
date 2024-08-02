

import {User} from "../components/model/user.model";
import {Event} from "../interface/event";

export interface Booking {
  id: number;
  reservationDate: string;
  numberOfTickets: number;
  event: Event;
  user: User;
}
