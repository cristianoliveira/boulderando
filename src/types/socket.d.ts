type SocketHandler = (data: any) => void;

interface SocketIO {
  on(eventId: string, handler: SocketHandler)
  emit(eventId: string, data: any)
}

interface SocketIOConnector {
  connect(url: string): SocketIO
}

declare module 'socket.io-client' {
  export default {} as SocketIOConnector
}
