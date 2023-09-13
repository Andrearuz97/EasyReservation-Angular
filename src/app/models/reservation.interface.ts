import { Room } from "./room.interface";
import { User } from "./user.interface";

export interface Reservation {
  id: number;
  dataCheckIn: Date;
  dataCheckOut: Date;
  utente: User;
  stanza: Room;
}
