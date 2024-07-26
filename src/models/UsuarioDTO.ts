import { Pedido } from "./Pedido";

export class UsuarioDTO{
    constructor(
        public id: number,
        public nombre: string,
        public correoElectronico: string,
        public direccion: string,
        public historialPedidos: Pedido[]
      ) {}
}