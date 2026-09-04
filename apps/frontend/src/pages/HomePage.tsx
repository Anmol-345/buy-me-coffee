import { useState, useEffect } from "react";
import { useEVM } from "../context/EVMContext";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CoffeeSvg } from "../components/svgs/CoffeeSvg";

function saveProfile(account: string, name: string) {
  localStorage.setItem(
    `dev_profile_${account.toLowerCase()}`,
    JSON.stringify({ name })
  );
}

function getProfile(account: string): { name: string } {
  try {
    const stored = localStorage.getItem(`dev_profile_${account.toLowerCase()}`);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { name: "" };
}

export default function HomePage() {
  const { account } = useEVM();
  const toast = useToast();

  const initialName = account ? getProfile(account).name : "";
  const [devName, setDevName] = useState(initialName);
  const [saved, setSaved] = useState(!!initialName);

  // Update dev name if account changes
  useEffect(() => {
    if (account) {
      const p = getProfile(account).name;
      setDevName(p);
      setSaved(!!p);
    } else {
      setDevName("");
      setSaved(false);
    }
  }, [account]);

  const handleSave = () => {
    if (!account) return;
    saveProfile(account, devName);
    setSaved(true);
    toast({
      title: "Profile saved!",
      description: "Your name will show on your tip page.",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  const shareUrl = account ? `${window.location.origin}/pay/${account}` : "";

  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share it so people can buy you a coffee.",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Hero */}
      <div className="hero-section">
        <div className="floating" style={{ marginBottom: "28px" }}>
          <CoffeeSvg width="90px" height="90px" />
        </div>
        <h1 className="hero-title">Buy Me a Coffee</h1>
        <p className="hero-subtitle">
          Accept 0.1 BOT tips on Botchain Mainnet.<br />
          Connect your wallet, set your name, share your link.
        </p>
      </div>

      {/* Card */}
      {account ? (
        <div className="link-card">
          {/* Name setup */}
          <div className="link-card-title">Your Profile</div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
            <input
              className="dark-input"
              style={{ flex: 1 }}
              placeholder="Your display name (e.g. Alice)"
              value={devName}
              onChange={(e) => { setDevName(e.target.value); setSaved(false); }}
            />
            <button
              className="copy-btn"
              onClick={handleSave}
            >
              {saved ? "✓ Saved" : "Save"}
            </button>
          </div>

          {/* Share Link */}
          <div className="link-card-title">Your Link</div>
          <div className="link-display">
            <span className="link-display-text">{shareUrl}</span>
            <button className="copy-btn" onClick={handleCopy}>Copy</button>
          </div>
          <p style={{
            fontSize: "0.82rem",
            color: "rgba(255, 180, 80, 0.4)",
            fontFamily: "'Space Grotesk', sans-serif",
            marginTop: "8px"
          }}>
            Anyone who visits this link can send you 0.1 BOT directly.
          </p>
        </div>
      ) : (
        <div className="link-card" style={{ textAlign: "center" }}>
          <div className="link-card-title" style={{ marginBottom: "12px" }}>Get Started</div>
          <p style={{
            color: "rgba(255, 200, 100, 0.5)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7
          }}>
            Connect your MetaMask wallet using the button above<br />to generate your personal tip link.
          </p>
        </div>
      )}
    </motion.div>
  );
}
