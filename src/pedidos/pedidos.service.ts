import { Injectable } from '@nestjs/common';
import { Pedido } from 'src/models/Pedido';

@Injectable()
export class PedidosService {
    
    private pedidos: Pedido[] = [];

    chequearStockLibros(pedido: Pedido): boolean{
        for(let i of pedido.items){
            if(i.libro.stock < i.cantidad){
                return false
            }
        }
        return true
    }

    precioTotalLibros(pedido: Pedido): number{
        let suma: number = 0

        for(let i of pedido.items){
            suma += i.libro.precio * i.cantidad
        }
        return suma
    }
    

    crearNuevoPedido(pedido: Pedido): void{
        let fechaActual: Date = new Date()
        let fechaActualString = fechaActual.toISOString().slice(0, 10)
        let verificadorStock: boolean = this.chequearStockLibros(pedido)

        if(pedido.fechaPedido == fechaActualString && verificadorStock){
            pedido.total = this.precioTotalLibros(pedido)
            this.pedidos.push(pedido)
        }
    }

    
    // De uso interno, no es parte de la guia.
    crearArrayPedidos(pedidos: Pedido[]): void{
        this.pedidos = pedidos
    }


    obtenerPedidoPorID(id: number): Pedido{
        for(let i of this.pedidos){
            if(i.id == id){
                return i
            }
        }
        return null
    }

    obtenerElementoPorID(id: number): string{
        for(let i in this.pedidos){
            if(this.pedidos[i].id == id){
                return i
            }
        }
        return null
    }


    obtenerPedidos(estado?: string, usuario?: string): Pedido[]{
        let pedidosFiltro: Pedido[] = []

        if(estado && usuario == null){
            for(let i of this.pedidos){
                if(i.estado == estado){
                    pedidosFiltro.push(i)
                }
            }
            return pedidosFiltro
        }
        else if(usuario && estado == null){
            for(let i of this.pedidos){
                if(i.usuario.nombre == usuario){
                    pedidosFiltro.push(i)
                }
            }
            return pedidosFiltro
        }
        else if(usuario && estado){
            for(let i of this.pedidos){
                if(i.usuario.nombre == usuario && i.estado == estado){
                    pedidosFiltro.push(i)
                }
            }
            return pedidosFiltro
        }
        return this.pedidos
    }


    editarEstadoPedidoxID(id: number, pedido: Pedido): boolean{
        let elementoPedido: string = this.obtenerElementoPorID(id)

        if(this.pedidos[elementoPedido].estado == "pendiente" && pedido.estado == "en proceso"){
            this.pedidos[elementoPedido].estado = pedido.estado
            return true
        }
        else if(this.pedidos[elementoPedido].estado == "en proceso" && pedido.estado == "enviado"){
            this.pedidos[elementoPedido].estado = pedido.estado
            return true
        } 
        else if(this.pedidos[elementoPedido].estado == "enviado" && pedido.estado == "entregado"){
            this.pedidos[elementoPedido].estado = pedido.estado
            return true
        }
        return false
    }
}