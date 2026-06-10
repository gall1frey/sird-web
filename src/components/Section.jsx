import { SubSection } from "./SubSection";

function hasTag(item, tag) {
    if (Array.isArray(item.Flag)) {
        return item.Flag.map(f => f.toLowerCase().trim()).includes(tag);
    }
    return String(item.Flag).toLowerCase().trim() === tag;
}

export function Section({ title, content, textSection, items }) {
    if (textSection === true) {
        return (
            <div className="section" id={`section-${title}`}>
                <div className="section-title">{ title }</div>
                <div className="section-content">{ content }</div>
            </div>
        );
    } else {
        const pages = content;

        const newArrivals = items.filter(item => hasTag(item, "new") || hasTag(item, "true"));
        const onSale      = items.filter(item => hasTag(item, "sale"));

        const subSections = pages.map((pageTitle) => {
            const filteredItems = items.filter(
                (item) => item.CategoryName === pageTitle
            );
            return (
                <SubSection
                    key={pageTitle}
                    title={pageTitle}
                    items={filteredItems}
                />
            );
        });

        return (
            <div className="section" id={`section-${title}`}>
                <div className="section-title">{ title }</div>
                <div className="section-view">
                    {newArrivals.length > 0 && (
                        <SubSection
                            key="__new_arrivals__"
                            title="New Arrivals"
                            items={newArrivals}
                        />
                    )}
                    {onSale.length > 0 && (
                        <SubSection
                            key="__sale__"
                            title="Sale"
                            items={onSale}
                        />
                    )}
                    {subSections}
                </div>
            </div>
        );
    }
}
