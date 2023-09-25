export interface Hotel {
  id: number;
  nome: string;
  citta?:string;
  indirizzo: string;
  descrizione: string;
  stelle: number;
  imageUrl?: string;
}
