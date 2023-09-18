export interface Room {
  id: number;
  numeroStanza: number;
  tipo: string;
  prezzo: number;
  imageUrl?: string;
  hotel: {
    id: number;
    nome: string;
    indirizzo: string;
    descrizione: string;
    stelle: number;
  };
}

