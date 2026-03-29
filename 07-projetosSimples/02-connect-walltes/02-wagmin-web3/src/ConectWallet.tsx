import { useConnect, useDisconnect, useConnection, useConnectors } from 'wagmi'

const ConnectWallet = () => {
  const connection = useConnection()
  const connect = useConnect()
  const disconnect = useDisconnect()
  const connectors = useConnectors()

  const isConnected = connection.status === 'connected'
  const address = connection.address

  if (isConnected) {
    return (
      <div>
        <button onClick={() => disconnect.mutate()}>Desconectar</button>
        <br />
        conectado: {address}
      </div>
    )
  }

  return (
    <button onClick={() => connect.mutate({ connector: connectors[0] })}>
      Conectar MetaMask
    </button>
  )
}

export default ConnectWallet
