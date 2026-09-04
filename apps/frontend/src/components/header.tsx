import { Link } from "react-router-dom";
import { LoginButton } from "./loginbutton";
import { BotBalance } from "./BotBalance";
import { CoffeeSvg } from "./svgs/CoffeeSvg";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <CoffeeSvg width="36px" height="36px" />
          <span className="header-logo-text">Buy Me a Coffee</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <BotBalance />
          <LoginButton />
        </div>
      </div>
    </header>
  );
}