import { Injectable } from '@nestjs/common';
import { Libro } from 'src/models/Libro';

@Injectable()
export class LibrosService {
    
    private libros: Libro[] = [];

    chequearSiExisteISBN(libro: Libro): boolean{
        for(let i: number = 0; i < this.libros.length; i++){
            if(this.libros[i].isbn == libro.isbn){
                return false
            }
        }
        return true
        
    }

    crearNuevoLibro(libro: Libro): void{
        this.libros.push(libro)
    }

    crearArrayLibros(libros: Libro[]): void{
        // for(let i: number = 0; i < this.usuarios.length; i++){
        //     if(this.usuarios[i].correoElectronico == usuario.correoElectronico){
        //         return null
        //     }
        // }
        // usuario.id = this.usuarios.length + 1

        this.libros = libros
    }


    obtenerLibroPorISBN(isbn: string): Libro{
        for(let i: number = 0; i < this.libros.length; i++){
            if(this.libros[i].isbn == isbn){
                return this.libros[i]
            }
        }
        return null
    }


    obtenerLibros(autor?: string, genero?: string): Libro[]{
        let librosFiltro: Libro[] = []

        if(autor && genero == null){
            for(let i: number = 0; i < this.libros.length; i++){
                if(this.libros[i].autor == autor){
                    librosFiltro.push(this.libros[i])
                }
            }
            return librosFiltro
        }
        else if(genero && autor == null){
            for(let i: number = 0; i < this.libros.length; i++){
                if(this.libros[i].genero == genero){
                    librosFiltro.push(this.libros[i])
                }
            }
            return librosFiltro
        }
        else if(genero && autor){
            for(let i: number = 0; i < this.libros.length; i++){
                if(this.libros[i].genero == genero && this.libros[i].autor == autor){
                    librosFiltro.push(this.libros[i])
                }
            }
            return librosFiltro
        }
        return this.libros
    }

    eliminarLibroPorISBN(isbn: string): void{
        for(let i: number = 0; i < this.libros.length; i++){
            if(this.libros[i].isbn == isbn){
                this.libros.splice(i,1)
            }
        }
        return null
    }
}