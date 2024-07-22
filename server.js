import {createServer} from 'node:http'
import fs from 'node:fs'
// import {v4} from 'uuid'
import lerUsuarios from './helper/lerUsuarios.js'

const PORT = 3333

const server = createServer((request, response) => {
    const {method, url} = request

    if(method === 'POST' && url === '/usuarios'){
        let body = ''
        request.on('data', (chunk) => {
            body += chunk
        })

        request.on('end', () => {
            const novoUsuario = JSON.parse(body)
            lerUsuarios((err, usuarios) => {
                if(err){
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message: "Não foi possível acessar o arquivo"}))
                    return
                }
                
                novoUsuario.id = usuarios.length + 1
                usuarios.push(novoUsuario)

                fs.writeFile('usuarios.json',  (usuarios, null, 2), (err) => {
                    if(err){
                        response.writeHead(500, {'Content-Type': 'application/json'})
                        response.end(JSON.stringify({message: "Não foi possível acessar o arquivo"}))
                        return
                    }
                    response.writeHead(200, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify(novoUsuario))
                })
                console.log('layla')
                console.log(novoUsuario)
                console.log(usuarios)
                return response.end()
            })
        })

    } else if(method === 'POST' && url === '/perfil'){

    } else if(method === 'POST' && url === '/login'){

    } else if(method === 'GET' && url.startsWith('/perfil/')){

    } else if(method === 'PUT' && url === '/perfil'){

    } else if(method === 'POST' && url === '/perfil/imagem'){

    } else if(method === 'GET' && url === 'usuarios'){

    }
})

server.listen(PORT, () => {
    console.log(`Servidor on ${PORT}`)
})