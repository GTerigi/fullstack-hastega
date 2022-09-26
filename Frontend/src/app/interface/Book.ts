export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  dataAggiunta: string;
  dataRimozione: string | null;
  trama: string;
  numeroLetture: number;
  userId: number;
  iconSrc?: string | null;
}
