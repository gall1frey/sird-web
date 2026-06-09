import { SubSection } from "./SubSection";

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

        const newArrivals = items.filter(item =>
            Array.isArray(item.Flag)
                ? item.Flag.map(f => f.toLowerCase().trim()).includes("true")
                : item.Flag === true || item.Flag === "TRUE"
        );

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
                    {subSections}
                </div>
            </div>
        );
    }
}