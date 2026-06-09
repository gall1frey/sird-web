import { SITE_TITLE } from "../config";

/**
 * @param {{ onMenuClick: () => void }} props
 */
export function Header({ onMenuClick }) {
  return (
    <header>
      <div className="header-all">
        <div className="header-text">
          <h1>{SITE_TITLE}</h1>
        </div>
        <div className="header-menu">
          <button
            className="hamburger"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&icon_names=menu" />
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}