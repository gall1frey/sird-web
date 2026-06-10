import { useState, useMemo } from "react";
import { useInventory } from "../hooks/useInventory";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { CartDrawer } from "../components/CartDrawer";
import { Section } from "../components/Section";
import { PAGE_ORDER, SECTION_ORDER } from "../config";

function hasTag(item, tag) {
    if (Array.isArray(item.Flag)) {
        return item.Flag.map(f => f.toLowerCase().trim()).includes(tag);
    }
    return String(item.Flag).toLowerCase().trim() === tag;
}

export default function Catalogue() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [cartOpen,    setCartOpen]    = useState(false);
    const { items } = useInventory();

    const activeSubsections = useMemo(() => {
        const hasNewArrivals = items.some(item => hasTag(item, "new") || hasTag(item, "true"));
        const hasSale        = items.some(item => hasTag(item, "sale"));
        const activeCategories = PAGE_ORDER.filter(cat =>
            items.some(item => item.CategoryName === cat)
        );
        return [
            ...(hasNewArrivals ? ["New Arrivals"] : []),
            ...(hasSale        ? ["Sale"]         : []),
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
            <Header
                onMenuClick={() => setSidebarOpen(true)}
                onCartClick={() => setCartOpen(true)}
            />
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                activeSubsections={activeSubsections}
            />
            <CartDrawer
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            />
            {sections}
        </>
    );
}
