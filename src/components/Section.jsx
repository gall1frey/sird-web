import { useInventory } from "../hooks/useInventory";
import { SubSection } from "./SubSection";

export function Section({ title, content, textSection }) {
	if (textSection === true) {
		return (
			<div className="section">
				<div className="section-title">{ title }</div>
				<div className="section-content">{ content }</div>
			</div>
		);
	} else {
		const { items, loading, error } = useInventory();
		const pages = content;
		console.log(items);
		
		const newArrivals = items.filter(
			(item) => item.Flag.includes("New")
		);

		const onSale = items.filter(
			(item) => item.Flag.includes("Sale")
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
			<div className="section">
				<div className="section-title">{ title }</div>
				<div className="section-view">
					{newArrivals.length > 0 && (
						<SubSection
							key="__new_arrivals__"
							title="New Arrivals"
							items={newArrivals}
						/>
					)}
					{newArrivals.length > 0 && (
						<SubSection
							key="__on_sale__"
							title="On Sale"
							items={onSale}
						/>
					)}
					{subSections}
				</div>
			</div>
		);
	}
}