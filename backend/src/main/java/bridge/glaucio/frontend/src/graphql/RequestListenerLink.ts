import { ApolloLink } from 'apollo-link'

export type SessionKeeperListener = (operation: any, response: any) => void

export class RequestListenerLink extends ApolloLink {
  private listeners: SessionKeeperListener[] = []

  request(operation: any, forward: (arg0: any) => any) {
    const forwardReturn = forward(operation)

    if (forwardReturn.map) {
      return forwardReturn.map((data: any) => {
        this.notify(operation, data)
        return data
      })
    }

    return forwardReturn
  }

  addListener(listener: SessionKeeperListener) {
    this.listeners.push(listener)
    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
  }

  notify(operation: any, response: any) {
    this.listeners.forEach(listener => listener(operation, response))
  }
}
