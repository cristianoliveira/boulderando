import socketChannelConnection from './socket-channel-connection'
import { PUSH_TO_CLIENT, PUSH_TO_REMOTE } from '../constants/socket-channels'

describe('socketChannelConnection', () => {
  it('test', async () => {
    const channelCode = 'test-connect-channel'
    const spyHandler = jest.fn()

    const handlers: Record<string, SocketHandler> = {}
    const stubedSocket: SocketIO = {
      on: (eventId, handler) => {
        handlers[eventId] = handler
      },
      emit: (eventId, data) => {
        handlers[eventId]?.(data)
      },
    }

    const mockedConnector = jest.fn().mockResolvedValue(stubedSocket)

    const channelSocket = await socketChannelConnection({
      channelCode,
      socketConnect: mockedConnector,
    })

    channelSocket.onEvent(spyHandler)

    const someData = { foo: 'goo' }
    stubedSocket.emit(PUSH_TO_CLIENT(channelCode), someData)

    expect(spyHandler).toHaveBeenCalledWith(someData)

    const emitSpy = jest.spyOn(stubedSocket, 'emit')
    channelSocket.dispatch(someData)
    expect(emitSpy).toHaveBeenCalledWith(PUSH_TO_REMOTE(channelCode), someData)
  })
})
