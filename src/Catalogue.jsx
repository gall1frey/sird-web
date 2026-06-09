import { useState, useMemo } from "react";
import { useInventory } from "./hooks/useInventory";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Section } from "./components/Section";
import { PAGE_ORDER, SECTION_ORDER } from "./config";

export default function Catalogue() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { items } = useInventory();

    // Subsections that actually have items, in PAGE_ORDER order
    const activeSubsections = useMemo(() => {
        const hasNewArrivals = items.some(item =>
            Array.isArray(item.Flag)
                ? item.Flag.map(f => f.toLowerCase().trim()).includes("true")
                : item.Flag === true || item.Flag === "TRUE"
        );
        const activeCategories = PAGE_ORDER.filter(cat =>
            items.some(item => item.CategoryName === cat)
        );
        return [
            ...(hasNewArrivals ? ["New Arrivals"] : []),
            ...activeCategories,
        ];
    }, [items]);

    const sections = SECTION_ORDER.map(page => (
        <Section
            key={page.title}
            title={page.title}
            content={page.text ? page.text : PAGE_ORDER}
            textSection={page.text ? true : false}
            items={items}
        />
    ));

    return (
        <>
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                activeSubsections={activeSubsections}
            />
            {sections}
        </>
    );
}