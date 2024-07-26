import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/models/Usuario';
import { UsuarioDTO } from 'src/models/UsuarioDTO';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
    
    constructor( private readonly servicio:UsuariosService){ }

    @Post()
    registrarNuevoUsuario(@Body() usuario: Usuario): void{
        this.servicio.registrarNuevoUsuario(usuario)
    }

    @Post('arrayUsuarios')
    registrarArrayUsuarios(@Body() usuarios: Usuario[]): void{
        this.servicio.registrarArrayUsuarios(usuarios)
    }

    @Get(':id')
    obtenerUsuarioPorID(@Param('id') idx: number, @Res() response: Response): void{
        let usuarioxID: UsuarioDTO = this.servicio.obtenerUsuarioPorID(idx);
        if(usuarioxID){
            response.status(200).send(usuarioxID);
        }
        else{
            response.status(404).send("Usuario no encontrado.");
        }
    }

    @Get()
    obtenerUsuarios(): UsuarioDTO[]{
        return this.servicio.obtenerUsuarios()    
    }

    @Delete(':id')
    eliminarUsuarioxID(@Param('id') idx: number): void{
        this.servicio.eliminarUsuarioxID(idx)
    }
}
