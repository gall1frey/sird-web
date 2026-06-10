import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card";
import { Modal } from "./Modal";

export function SubSection({ title, items }) {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    if (items.length === 0) return <></>;

    return (
        <>
            <div className="subsection" id={`subsection-${title}`}>
                <div
                    className="subsection-title subsection-title-link"
                    onClick={() => navigate(`/category/${encodeURIComponent(title)}`)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") navigate(`/category/${encodeURIComponent(title)}`); }}
                >
                    {title}
                    <span className="subsection-title-cta">View all ›</span>
                </div>
                <div className="subsection-content">
                    {items.map((item, i) => (
                        <Card
                            key={item.Sno || item.Name + i}
                            item={item}
                            onClick={() => setSelected(item)}
                        />
                    ))}
                </div>
            </div>

            {selected && (
                <Modal item={selected} onClose={() => setSelected(null)} />
            )}
        </>
    );
}
