export interface Room {
  id: number;
  numeroStanza: number;
  tipo: string;
  prezzo: number;
  imageUrl?: string;
  hotel: {
    id: number;
    nome: string;
    citta?:string;
    cap?:string;
    indirizzo: string;
    descrizione: string;
    stelle: number;
  };
}

