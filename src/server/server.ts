import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'
// import { IUser } from '../types'

const port: number = 5000

class App {
  // private users: IUser[] = []
  private server: http.Server
  private port: number

  constructor(port: number) {
    this.port = port

    const app = express()
    app.use(express.static(path.join(__dirname, '../client')))

    this.server = new http.Server(app)
    const io = new socketIO.Server(this.server, {})
    io.on('connection', (socket: socketIO.Socket) => {
      const socketId = socket.id
      const connectedUser = {
        socketId: socketId,
        name: 'Mehmethan',
        age: 50,
      }
      // this.users.push(connectedUser)

      console.log('a user connected', connectedUser)
      // console.log('users length', this.users.length)
      socket.emit('message', connectedUser)
      socket.on('disconnect', function () {
        console.log('disconnected', socketId)
      })
    })
  }

  public Start() {
    this.server.listen(this.port)
    console.log(`Server listening on port ${this.port}`)
  }
}

new App(port).Start()
