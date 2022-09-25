export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  dataAggiunta: Date;
  dataRimozione: Date | null;
  trama: string;
  numeroLetture: number;
  userId: number;
  iconSrc?: string | null;
}
