import fs from 'node:fs'

const lerUsuarios = (callback) => {
    fs.readFile('usuarios.json', 'utf-8', (err, data) => {
        if(err){
            callback(err)
        } try {
            const usuarios = JSON.parse(data)
            callback(usuarios)
        } catch (error){
            callback(error)
        }
    })
}

export default lerUsuarios;