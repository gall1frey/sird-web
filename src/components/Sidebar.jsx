import { useEffect } from "react";
import { SECTION_ORDER } from "../config";

function scrollToId(id, onClose) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
}

/**
 * @param {{ open: boolean, onClose: () => void, activeSubsections: string[] }} props
 */
export function Sidebar({ open, onClose, activeSubsections }) {

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            <div
                className={`sidebar-backdrop${open ? " sidebar-backdrop-visible" : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <nav className={`sidebar${open ? " sidebar-open" : ""}`} aria-label="Site navigation">

                <div className="sidebar-header">
                    <button className="sidebar-close" onClick={onClose} aria-label="Close navigation">✕</button>
                </div>

                <ul className="sidebar-list">
                    {SECTION_ORDER.map(section => (
                        <li key={section.title}>
                            <button
                                className="sidebar-section-link"
                                onClick={() => scrollToId(`section-${section.title}`, onClose)}
                            >
                                {section.title}
                            </button>

                            {!section.text && activeSubsections.length > 0 && (
                                <ul className="sidebar-sublist">
                                    {activeSubsections.map(sub => (
                                        <li key={sub}>
                                            <button
                                                className="sidebar-subsection-link"
                                                onClick={() => scrollToId(`subsection-${sub}`, onClose)}
                                            >
                                                {sub}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}