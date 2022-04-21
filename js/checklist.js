const checklist = document.getElementById('checklistContainer');
let checklistContent = `<div class="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 300, "gutter": 20, "fitWidth": true }'>`;

function swapCollapse (cardID) {
	const icon = document.getElementById(cardID).children[0];
	//icon.classList.remove('collapsed');
	icon.classList.toggle('bi-arrows-collapse');
	icon.classList.toggle('bi-arrows-expand');
}

for (const listIndex in checklistData) {
	const listGroup = checklistData[listIndex];
	checklistContent += `<div class="grid-item" id="${listGroup.id}"><i class="bi bi-arrows-collapse" data-bs-toggle="collapse" data-bs-target="#collapse${listGroup.id}" aria-expanded="true" aria-controls="collapse${listGroup.id}" onclick="swapCollapse('${listGroup.id}')"></i><h2>${listGroup.title}</h2><div class="collapse show" id="collapse${listGroup.id}">`;
	for (const itemIndex in listGroup.contents) {
		const item = listGroup.contents[itemIndex];
		checklistContent += `<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="${listGroup.id}-${item.id}"><label class="form-check-label" for="${listGroup.id}-${item.id}">${item.title}</label></div>`;
	}
	checklistContent += `</div></div>`;
}

checklistContent += `</div>`;

checklist.innerHTML = checklistContent;