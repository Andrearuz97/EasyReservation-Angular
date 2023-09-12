export interface Room {
  id: number;
  numeroStanza: number;
  tipo: string;
  prezzo: number;
  hotel: {
    nome: string;
    indirizzo: string;
    descrizione: string;
    stelle: number;
  };
}

