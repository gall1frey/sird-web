// ─────────────────────────────────────────────────────────────
//  components/FilterBar.jsx
//  Search, tag chips (multi-select AND), and stock filter.
// ─────────────────────────────────────────────────────────────

const STOCK_OPTIONS = ["All", "In Stock", "Out of Stock"];

function Pill({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`tag-chip${active ? " tag-chip-active" : ""}`}
        >
            {label}
        </button>
    );
}

/**
 * @param {{
 *   search:        string,
 *   onSearch:      (v: string) => void,
 *   tags:          string[],
 *   activeTags:    Set<string>,
 *   onTagToggle:   (tag: string) => void,
 *   stockFilter:   string,
 *   onStockFilter: (v: string) => void,
 * }} props
 */
export function FilterBar({ search, onSearch, tags, activeTags, onTagToggle, stockFilter, onStockFilter }) {
    return (
        <div className="filter-bar">

            {/* ── Search ── */}
            <div className="category-search-wrap">
                <input
                    className="category-search"
                    type="search"
                    placeholder="Search by serial…"
                    value={search}
                    onChange={e => onSearch(e.target.value)}
                />
            </div>

            {/* ── Tag chips + stock pills ── */}
            <div className="category-tags">

                {tags.length > 0 && (
                    <>
                        <span className="filter-bar-label">Tags</span>
                        {tags.map(tag => (
                            <Pill
                                key={tag}
                                label={tag}
                                active={activeTags.has(tag)}
                                onClick={() => onTagToggle(tag)}
                            />
                        ))}
                        <div className="filter-bar-divider" />
                    </>
                )}

                <span className="filter-bar-label">Stock</span>
                {STOCK_OPTIONS.map(s => (
                    <Pill
                        key={s}
                        label={s}
                        active={stockFilter === s}
                        onClick={() => onStockFilter(s)}
                    />
                ))}
            </div>
        </div>
    );
}