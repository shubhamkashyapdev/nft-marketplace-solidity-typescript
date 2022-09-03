
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3Provider } from '@providers'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.localhost],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Ethereum NFT Marketplace',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={midnightTheme()}>
          <ToastContainer />
          <Web3Provider>
            <Component {...pageProps} />
          </Web3Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
