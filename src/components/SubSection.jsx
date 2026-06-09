import { useState } from "react";
import { Card } from "./Card";
import { Modal } from "./Modal";


export function SubSection({ title, items }){
    const [selected, setSelected] = useState(null);
    
    if (items.length > 0) {
        return (
            <>
                <div className="subsection">
                    <div className="subsection-title">
                        {title}
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
    } else {
        return <></>;
    }
}