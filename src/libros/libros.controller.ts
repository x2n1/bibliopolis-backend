import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { Response } from 'express';
import { Libro } from 'src/models/Libro';

@Controller('libros')
export class LibrosController {
    
    constructor( private readonly servicio:LibrosService){ }

    @Post()
    crearNuevoLibro(@Body() libro: Libro, @Res() response: Response): void{
        let chequeoISBN: boolean = this.servicio.chequearSiExisteISBN(libro)

        if(chequeoISBN){
            response.status(200).send(this.servicio.crearNuevoLibro(libro))
        }
        else{
            response.status(404).send("ISBN ya registrado.");
        }
    }

    @Post('arrayLibros')
    crearArrayLibros(@Body() usuarios: Libro[]): void{
        this.servicio.crearArrayLibros(usuarios)
    }

    @Get(':isbn')
    obtenerLibroPorISBN(@Param('isbn') isbn: string, @Res() response: Response): void{
        let libroxISBN: Libro = this.servicio.obtenerLibroPorISBN(isbn);
        if(libroxISBN){
            response.status(200).send(libroxISBN);
        }
        else{
            response.status(404).send("Libro no encontrado, porfavor intente con otro ISBN.");
        }
    }

    @Get()
    obtenerLibros(@Res() response: Response,
            @Query('autor') autor?: string, 
            @Query('genero') genero?: string): void{
        if(autor && genero == null){
            response.status(200).send(this.servicio.obtenerLibros(autor,null))
        }
        else if(genero && autor == null){
            response.status(200).send(this.servicio.obtenerLibros(null,genero))
        }
        else if(genero && autor){
            response.status(200).send(this.servicio.obtenerLibros(autor,genero))
        }
        else if(genero == null && autor== null){
            response.status(200).send(this.servicio.obtenerLibros())  
        } 
    }

    @Delete(':isbn')
    eliminarLibroPorISBN(@Param('isbn') isbn: string): void{
        this.servicio.eliminarLibroPorISBN(isbn)
    }
}
