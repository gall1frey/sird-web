// ─────────────────────────────────────────────────────────────
//  components/Header.jsx
//  Dark top bar: site title, item counts, search input.
// ─────────────────────────────────────────────────────────────

import { SITE_TITLE } from "../config";


/**
 * @param {{ items: object[], search: string, onSearch: (v:string)=>void }} props
 */

export function Header({ }) {
  // Needs proper margins etc
  return (
    <>
      <header>
        <div className="header-all">
          <div className="header-text">
            <h1>{SITE_TITLE}</h1>
          </div>
          <div className="header-menu hamburger">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&icon_names=menu" />
            <span className="material-symbols-outlined">
            menu
            </span>
          </div>
        </div>  
      </header>
    </>
  );
}