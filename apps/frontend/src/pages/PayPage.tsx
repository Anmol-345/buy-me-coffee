import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEVM } from "../context/EVMContext";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Contract, parseEther } from "ethers";
import { config, COFFEE_CONTRACT_ABI } from "@repo/config-contract";
import { CoffeeSvg } from "../components/svgs/CoffeeSvg";
import { shortenAddress } from "../utils";

function getDevName(address: string): string {
  try {
    const stored = localStorage.getItem(`dev_profile_${address.toLowerCase()}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.name) return parsed.name;
    }
  } catch {}
  return "";
}

export default function PayPage() {
  const { address } = useParams<{ address: string }>();
  const { account, signer } = useEVM();
  const toast = useToast();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!address) {
    return (
      <div style={{ color: "#FFB347", textAlign: "center", marginTop: "60px", fontFamily: "'Space Grotesk', sans-serif" }}>
        Invalid address in URL.
      </div>
    );
  }

  const devName = getDevName(address);

  const handleSend = async () => {
    if (!account || !signer) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your MetaMask wallet first.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      const contract = new Contract(config.CONTRACT_ADDRESS, COFFEE_CONTRACT_ABI, signer);

      const tx = await contract.sendCoffee(
        address, 
        name || "Someone", 
        message || "☕", 
        {
          value: parseEther("0.1")
        }
      );
      
      toast({
        title: "Transaction Submitted",
        description: "Waiting for confirmation on Botchain...",
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      await tx.wait();

      toast({
        title: "☕ Coffee Sent!",
        description: "0.1 BOT sent successfully on Botchain.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setName("");
      setMessage("");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Transaction Failed",
        description: error?.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <div className="pay-card">
        {/* Animated Coffee Icon */}
        <div className="pay-card-icon floating">
          <CoffeeSvg width="96px" height="96px" />
        </div>

        {/* Dev Name or Address */}
        {devName ? (
          <>
            <div className="dev-name">{devName}</div>
            <div className="dev-address">{shortenAddress(address)}</div>
          </>
        ) : (
          <div className="dev-name" style={{ fontSize: "1.4rem", letterSpacing: "0.03em" }}>
            {shortenAddress(address)}
          </div>
        )}

        <p className="pay-tagline">would love a coffee ☕</p>

        {/* Amount badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
          <span className="pay-amount-badge">
            ☕ 0.1 BOT
          </span>
        </div>

        {/* Inputs */}
        <div className="input-stack">
          <input
            className="dark-input"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="dark-input"
            placeholder="Leave a message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button
          className="glow-button"
          style={{ width: "100%" }}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "☕ Send 0.1 BOT"}
        </button>

        {!account && (
          <p style={{
            marginTop: "16px",
            fontSize: "0.85rem",
            color: "rgba(255, 180, 80, 0.4)",
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            Connect your MetaMask wallet in the header.
          </p>
        )}
      </div>
    </motion.div>
  );
}
