export interface Hotel {
  id: number;
  nome: string;
  citta?:string;
  indirizzo: string;
  cap?:string;
  descrizione: string;
  stelle: number;
  imageUrl?: string;
}
