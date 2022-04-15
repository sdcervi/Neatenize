const checklist = document.getElementById('checklistContainer');
let checklistContent = `<div class="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 300, "gutter": 20, "fitWidth": true }'>`;

for (const listIndex in checklistData) {
	const listGroup = checklistData[listIndex];
	checklistContent += `<div class="grid-item" id="${listGroup.id}"><h2>${listGroup.title}</h2>`;
	for (const itemIndex in listGroup.contents) {
		const item = listGroup.contents[itemIndex];
		checklistContent += `<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="${listGroup.id}-${item.id}"><label class="form-check-label" for="${listGroup.id}-${item.id}">${item.title}</label></div>`;
	}
	checklistContent += `</div>`;
}

checklistContent += `</div>`;

checklist.innerHTML = checklistContent;