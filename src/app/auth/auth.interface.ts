export interface Auth {
  accessToken: string;
  user: {
      id:number;
      nome:string;
      cognome:string
      email:string;
  }
}
