import { useState, useEffect } from "react";
import { useEVM } from "../context/EVMContext";
import { formatEther } from "ethers";

export function BotBalance() {
  const [balance, setBalance] = useState<string | null>(null);
  const { account, provider } = useEVM();

  useEffect(() => {
    if (!account || !provider) { 
      setBalance(null); 
      return; 
    }
    
    provider.getBalance(account)
      .then((bal) => setBalance(parseFloat(formatEther(bal)).toFixed(2)))
      .catch((e) => {
        console.error("Failed to fetch balance", e);
        setBalance(null);
      });
  }, [account, provider]);

  if (!account || balance === null) return null;

  return (
    <div className="balance-pill">
      <span>☕</span>
      <span>{balance} BOT</span>
    </div>
  );
}
