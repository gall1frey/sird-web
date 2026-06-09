import { useState } from "react";
import { useInventory } from "../hooks/useInventory";
import { SubSection } from "./SubSection";

export function Section({ title, content, textSection }) {
	// If it is a text section (About, Contact)
	if (textSection === true) {
		return (
		  <>
			<div className="section">
				<div className="section-title">
					{ title }
				</div>
				<div className="section-content">
					{ content }
				</div>
			</div>
		  </>
		);
	} else {
		const { items, loading, error } = useInventory();
		let pages = content;
				
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
		  <>
			<div className="section">
				<div className="section-title">
					{ title }
				</div>
				<div className="section-view">
					{subSections}
				</div>
			</div>
		  </>
		);
	}
}