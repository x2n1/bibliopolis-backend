export class Libro{
    constructor(
        public isbn: number,
        public titulo: string,
        public autor: string,
        public editorial: string,
        public genero: string,
        public precio: number,
        public descripción: string,
        public imagen: string,
        public stock: number
      ) {}
}