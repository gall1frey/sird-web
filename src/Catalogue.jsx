// ─────────────────────────────────────────────────────────────
//  Catalogue.jsx  —  root component
//
//  Responsibilities (only):
//    1. Fetch data via useInventory hook
//    2. Hold filter / search / selection state
//    3. Derive filtered + grouped items
//    4. Render layout: Header → FilterBar → grid sections → Modal
//
//  All visual details live in the components/ folder.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { useInventory }  from "./hooks/useInventory";
import { Header }        from "./components/Header";
import { Section } from "./components/Section";
// import { FilterBar }     from "./components/FilterBar";
// import { Card }          from "./components/Card";
// import { Modal }         from "./components/Modal";

import { PAGE_ORDER, SECTION_ORDER } from "./config";

// ── Loading screen ───────────────────────────────────────────
function LoadingScreen() {
}

// ── Error screen ─────────────────────────────────────────────
function ErrorScreen({ message }) {
}

// ── Empty state ──────────────────────────────────────────────
function EmptyState() {
}

// ── Root component ───────────────────────────────────────────
export default function Catalogue() {
//   const { items, loading, error } = useInventory();

//   const [search,      setSearch]      = useState("");
//   const [catFilter,   setCatFilter]   = useState("All");
//   const [stockFilter, setStockFilter] = useState("All");
//   const [selected,    setSelected]    = useState(null);

  // Early returns for loading / error states
//   if (loading) return <><LoadingScreen /></>;
//   if (error)   return <><ErrorScreen message={error} /></>;

  // ── Derived data ─────────────────────────────────────────
  // const categories = [
  //   "All",
  //   ...Array.from(new Set(items.map((i) => i.CategoryName).filter(Boolean))).sort(),
  // ];

  const pages = PAGE_ORDER

  const sections = SECTION_ORDER.map(page => <Section 
		key = { page.title } 
		title = { page.title }
		content = { page.text ? page.text : pages }
		textSection = { page.text ? true : false }
	  />);
  
  // ── Render ───────────────────────────────────────────────
  return(
	<>
	  <Header/>
	  {sections}
	</>
  )
}