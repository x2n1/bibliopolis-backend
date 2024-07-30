import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Pedido } from 'src/models/Pedido';
import { PedidosService } from './pedidos.service';
import { Response } from 'express';


@Controller('pedidos')
export class PedidosController {
    
    constructor( private readonly servicio:PedidosService){ }

    @Post()
    crearNuevoLibro(@Body() pedido: Pedido, @Res() response: Response): void{
        let fechaActual: Date = new Date()
        let fechaActualString = fechaActual.toISOString().slice(0, 10)
        let verificadorStock: boolean = this.servicio.chequearStockLibros(pedido)

        if(pedido.fechaPedido == fechaActualString && verificadorStock){
            response.status(200).send(this.servicio.crearNuevoPedido(pedido))
        }
        else if(pedido.fechaPedido != fechaActualString && verificadorStock){
            response.status(400).send("Fecha del pedido no corresponde con fecha actual, porfavor revisar.");
        }
        else if(pedido.fechaPedido == fechaActualString && verificadorStock == false){
            response.status(400).send("No queda stock de uno de los libros que se estan comprando.");
        }
        else{
            response.status(400).send("Fecha del pedido no corresponde con fecha actual, y tampoco queda stock de uno de los libros que se estan comprando.");
        }
    }

    // De uso interno, no es parte de la guia.
    @Post('arrayPedidos')
    crearArrayPedidos(@Body() pedidos: Pedido[]): void{
        this.servicio.crearArrayPedidos(pedidos)
    }

    @Get(':id')
    obtenerPedidoPorID(@Param('id') id: number, @Res() response: Response): void{
        let pedidoPorID: Pedido = this.servicio.obtenerPedidoPorID(id);
        if(pedidoPorID){
            response.status(200).send(pedidoPorID);
        }
        else{
            response.status(404).send("Pedido no encontrado, porfavor intente con otro ID.");
        }
    }

    @Get()
    obtenerPedidos(@Res() response: Response,
                    @Query('estado') estado?: string, 
                    @Query('usuario') usuario?: string): void{
        if(estado && usuario == null){
            response.status(200).send(this.servicio.obtenerPedidos(estado,null))
        }
        else if(usuario && estado == null){
            response.status(200).send(this.servicio.obtenerPedidos(null,usuario))
        }
        else if(usuario && estado){
            response.status(200).send(this.servicio.obtenerPedidos(estado,usuario))
        }
        else if(usuario == null && estado== null){
            response.status(200).send(this.servicio.obtenerPedidos())  
        } 
        response.status(200).send(this.servicio.obtenerPedidos())
    }

    @Put(':id')
    editarEstadoPedidoxID( @Param('id') id:number, 
                            @Body() pedido:Pedido,
                            @Res() response:Response ):void{

        let resultadoPedidoxID: boolean = this.servicio.editarEstadoPedidoxID(id, pedido);
        if(resultadoPedidoxID){
            response.status(200).send();
        }
        else{
            response.status(400).send('estado incorrecto');
        }
    }
}
