import { Libro } from "./Libro";

export class ItemPedido{
    constructor(
        public libro: Libro,
        public cantidad: number
      ) {}
}