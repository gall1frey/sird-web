// ─────────────────────────────────────────────────────────────
//  pages/CategoryPage.jsx
//  Full grid view for one category (or New Arrivals).
//  All filter logic lives here; UI is delegated to FilterBar.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";
import { FilterBar } from "../components/FilterBar";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";

export function CategoryPage() {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const { items, loading, error } = useInventory();

    const [search,      setSearch]      = useState("");
    const [activeTags,  setActiveTags]  = useState(new Set());
    const [stockFilter, setStockFilter] = useState("All");
    const [selected,    setSelected]    = useState(null);

    const title = decodeURIComponent(categoryName);

    const toggleTag = (tag) => {
        setActiveTags(prev => {
            const next = new Set(prev);
            next.has(tag) ? next.delete(tag) : next.add(tag);
            return next;
        });
    };

    // Base pool for this category
    const poolItems = useMemo(() => {
        if (title === "New Arrivals") {
            return items.filter(item =>
                Array.isArray(item.Flag)
                    ? item.Flag.map(f => f.trim().toLowerCase()).includes("true")
                    : item.Flag === true
            );
        }
        return items.filter(item => item.CategoryName === title);
    }, [items, title]);

    // All unique tags in this pool (excluding raw boolean strings)
    const allTags = useMemo(() => {
        const set = new Set();
        poolItems.forEach(item => {
            (item.Tags || []).forEach(t => {
                const trimmed = t.trim();
                if (trimmed && !["true", "false", "none", ""].includes(trimmed.toLowerCase()))
                    set.add(trimmed);
            });
        });
        return Array.from(set).sort();
    }, [poolItems]);

    // Apply all three filters (tags use AND)
    const filtered = useMemo(() => {
        return poolItems.filter(item => {
            const matchesSearch = !search.trim() ||
                item.Sno?.toLowerCase().includes(search.toLowerCase());

            const itemTags = (item.Tags || []).map(t => t.trim());
            const matchesTags = activeTags.size === 0 ||
                [...activeTags].every(tag => itemTags.includes(tag));

            const matchesStock =
                stockFilter === "All"          ? true :
                stockFilter === "In Stock"     ? item.InStock === true :
                                                 item.InStock === false;

            return matchesSearch && matchesTags && matchesStock;
        });
    }, [poolItems, search, activeTags, stockFilter]);

    return (
        <div className="category-page">

            {/* ── Header ── */}
            <div className="category-page-header">
                <button
                    className="category-back-btn"
                    onClick={() => navigate(-1)}
                    aria-label="Back"
                >
                    ‹
                </button>
                <h1 className="category-page-title">{title}</h1>
                <span className="category-page-count">{filtered.length} items</span>
            </div>

            {/* ── Filters ── */}
            <FilterBar
                search={search}           onSearch={setSearch}
                tags={allTags}            activeTags={activeTags}   onTagToggle={toggleTag}
                stockFilter={stockFilter}                           onStockFilter={setStockFilter}
            />

            {/* ── Grid ── */}
            {loading && <p className="category-status">Loading…</p>}
            {error   && <p className="category-status">{error}</p>}
            {!loading && !error && filtered.length === 0 && (
                <p className="category-status">No items found.</p>
            )}

            <div className="category-grid">
                {filtered.map((item, i) => (
                    <Card
                        key={item.Sno || item.Name + i}
                        item={item}
                        onClick={() => setSelected(item)}
                    />
                ))}
            </div>

            {selected && (
                <Modal item={selected} onClose={() => setSelected(null)} />
            )}
        </div>
    );
}