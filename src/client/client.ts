interface IUser {
  socketId: string
  name: string
  age: number
}

class Client {
  private socket: SocketIOClient.Socket

  constructor() {
    this.socket = io()
    this.socket.on('message', function (message: IUser) {
      console.log(message)
      document.body.innerHTML = JSON.stringify(message)
    })
  }
}

const client = new Client()
