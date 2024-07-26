import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/models/Usuario';
import { UsuarioDTO } from 'src/models/UsuarioDTO';

@Injectable()
export class UsuariosService {
    
    private usuarios: Usuario[] = [];

    crearUsuarioDTO(usuariosArr: Usuario[]): UsuarioDTO[]{
        let usuariosDTO:  UsuarioDTO[] = []

        for(let i: number = 0; i < this.usuarios.length; i++){
            usuariosDTO.push(new UsuarioDTO(usuariosArr[i].id,usuariosArr[i].nombre,
            usuariosArr[i].correoElectronico,usuariosArr[i].direccion,usuariosArr[i].historialPedidos) )
        }
        return usuariosDTO
    }

    registrarNuevoUsuario(usuario: Usuario): void{
        for(let i: number = 0; i < this.usuarios.length; i++){
            if(this.usuarios[i].correoElectronico == usuario.correoElectronico){
                return null
            }
        }
        usuario.id = this.usuarios.length + 1

        this.usuarios.push(usuario)
    }

    registrarArrayUsuarios(usuarios: Usuario[]): void{
        // for(let i: number = 0; i < this.usuarios.length; i++){
        //     if(this.usuarios[i].correoElectronico == usuario.correoElectronico){
        //         return null
        //     }
        // }
        // usuario.id = this.usuarios.length + 1

        this.usuarios = usuarios
    }


    obtenerUsuarioPorID(idx: number): UsuarioDTO{
        let usuariosDTO: UsuarioDTO[] = this.crearUsuarioDTO(this.usuarios)
        for(let i: number = 0; i < usuariosDTO.length; i++){
            if(usuariosDTO[i].id == idx){
                return usuariosDTO[i]
            }
        }
        return null
    }


    obtenerUsuarios(): UsuarioDTO[]{
        return this.crearUsuarioDTO(this.usuarios)
    }

    eliminarUsuarioxID(idx: number): void{
        for(let i: number = 0; i < this.usuarios.length; i++){
            if(this.usuarios[i].id == idx){
                this.usuarios.splice(i,1)
            }
        }
        return null
    }
}