import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

import { BrowserProvider, JsonRpcSigner } from 'ethers';

interface EVMContextType {
  account: string | null;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
}

const EVMContext = createContext<EVMContextType | undefined>(undefined);

export function EVMProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const BOTCHAIN_CHAIN_ID = '0x2a5';
  const BOTCHAIN_RPC_URL = 'https://rpc.botchain.ai';

  const checkNetwork = async () => {
    if (!window.ethereum) return;
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== BOTCHAIN_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BOTCHAIN_CHAIN_ID }],
        });
      }
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: BOTCHAIN_CHAIN_ID,
                chainName: 'Botchain Mainnet',
                rpcUrls: [BOTCHAIN_RPC_URL],
                nativeCurrency: {
                  name: 'BOT',
                  symbol: 'BOT',
                  decimals: 18,
                },
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Botchain network', addError);
        }
      } else {
        console.error('Error switching network', switchError);
      }
    }
  };

  const connect = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask or another EVM wallet.");
      return;
    }
    
    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        const _provider = new BrowserProvider(window.ethereum);
        setProvider(_provider);
        const _signer = await _provider.getSigner();
        setSigner(_signer);
        await checkNetwork();
      }
    } catch (error) {
      console.error("User rejected request", error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          const _provider = new BrowserProvider(window.ethereum);
          setProvider(_provider);
          _provider.getSigner().then(setSigner);
        } else {
          disconnect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    }
  }, []);

  return (
    <EVMContext.Provider value={{ account, provider, signer, connect, disconnect, isLoading }}>
      {children}
    </EVMContext.Provider>
  );
}

export function useEVM() {
  const context = useContext(EVMContext);
  if (context === undefined) {
    throw new Error('useEVM must be used within an EVMProvider');
  }
  return context;
}
