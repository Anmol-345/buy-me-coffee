import { FaWallet } from "react-icons/fa";
import { useEVM } from "../context/EVMContext";
import { shortenAddress } from "../utils";

export function LoginButton() {
  const { account, connect, isLoading } = useEVM();

  return (
    <button
      id="veworld-button"
      onClick={connect}
      disabled={isLoading || !!account}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(255, 140, 0, 0.12)",
        border: "1px solid rgba(255, 140, 0, 0.35)",
        borderRadius: "10px",
        padding: "8px 18px",
        color: "#FFB347",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: "0.9rem",
        cursor: account ? "default" : "pointer",
        transition: "all 0.2s",
        opacity: isLoading ? 0.7 : 1
      }}
      onMouseEnter={(e) => {
        if (!account) {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 140, 0, 0.22)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(255, 120, 0, 0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (!account) {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 140, 0, 0.12)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }
      }}
    >
      <FaWallet style={{ fontSize: "0.85rem" }} />
      {account ? shortenAddress(account) : (isLoading ? "Connecting..." : "Connect MetaMask")}
    </button>
  );
}