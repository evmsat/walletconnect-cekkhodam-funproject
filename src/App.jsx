import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, WagmiProvider } from 'wagmi'
import { useState } from 'react'
import './App.css'

const queryClient = new QueryClient()

// Project ID Public (untuk testing)
const projectId = 'f3d64020786576d8da1426466336e763' 

const metadata = {
  name: 'Cek Khodam Web3',
  description: 'App WalletConnect Fun Project',
  url: 'https://mywebsite.com', 
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const networks = [mainnet, arbitrum]
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true 
  }
})

function KhodamChecker() {
  const { address, isConnected } = useAccount()
  const [khodam, setKhodam] = useState(null)

  const listKhodam = [
    "Naga Gas Fee Mahal 🐉", "Kucing Airdrop 😺", "Harimau Staking 🐅",
    "Tuyul Private Key 👶", "Paus Nyangkut 🐋", "Elang Stop Loss 🦅",
    "Katak Mempool 🐸", "Banteng Bull Run 🐂"
  ];

  const cekKhodam = () => {
    if (!address) return;
    const lastChar = address.slice(-1).charCodeAt(0);
    const index = lastChar % listKhodam.length;
    setKhodam(listKhodam[index]);
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center', minHeight: '100vh', backgroundColor: '#1a1a1a', color: 'white' }}>
      <h1>🔮 Web3 Cek Khodam</h1>
      <p style={{ marginBottom: '30px' }}>Sambungkan walletmu untuk melihat makhluk penjagamu!</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <appkit-button />
      </div>

      {isConnected && (
        <div style={{ border: '1px solid #333', padding: '30px', borderRadius: '15px', background: '#2a2a2a', maxWidth: '400px', margin: '0 auto' }}>
          <p>Wallet Terdeteksi: <br/> <code style={{ color: '#4caf50' }}>{address.slice(0,6)}...{address.slice(-4)}</code></p>
          
          <button 
            onClick={cekKhodam}
            style={{ marginTop: '15px', padding: '12px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#3396FF', color: 'white', border: 'none', borderRadius: '25px', fontWeight: 'bold' }}
          >
            Cek Khodam Saya 🎲
          </button>

          {khodam && (
            <div style={{ marginTop: '30px', animation: 'fadeIn 0.5s' }}>
              <h3>Khodam Kamu Adalah:</h3>
              <h1 style={{ color: '#FFD700', fontSize: '2.5em', margin: '10px 0' }}>{khodam}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <KhodamChecker />
      </QueryClientProvider>
    </WagmiProvider>
  )
}