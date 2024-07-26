import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/models/Usuario';
import { UsuarioDTO } from 'src/models/UsuarioDTO';

@Injectable()
export class UsuariosService {
    
    private usuarios: Usuario[] = [];


    registrarNuevoUsuario(usuario: Usuario): void{
        for(let i: number = 0; i < this.usuarios.length; i++){
            if(this.usuarios[i].correoElectronico == usuario.correoElectronico){
                return null
            }
        }
        usuario.id = this.usuarios.length + 1

        this.usuarios.push(usuario)
    }


    obtenerUsuarioPorID(idx: number): Usuario{
        for(let i: number = 0; i < this.usuarios.length; i++){
            if(this.usuarios[i].id == idx){
                return this.usuarios[i]
            }
        }
        return null
    }


    obtenerUsuarios(): UsuarioDTO[]{
        let usuariosDTO:  UsuarioDTO[] = []
        for(let i: number = 0; i < this.usuarios.length; i++){
            usuariosDTO.push(new UsuarioDTO(this.usuarios[i].id,this.usuarios[i].nombre,
            this.usuarios[i].correoElectronico,this.usuarios[i].direccion,this.usuarios[i].historialPedidos) )
        }
        return usuariosDTO
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