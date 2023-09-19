import { Room } from "./room.interface";
import { User } from "./user.interface";
import { Hotel } from "./hotel.model";

export interface Reservation {
  id: number;
  dataCheckIn: Date;
  dataCheckOut: Date;
  utente: User;
  stanza: Room;
  hotel: Hotel;
}
