const checklist = document.getElementById('checklistContainer');
let checklistContent = `<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">`;

function expandAll () {
	const cardArray = document.querySelectorAll('.collapse');
	for (card of cardArray) {
		const cardID = document.getElementById(card.id);
		if (!(card.classList.contains('show'))) {
			const bsCollapse = new bootstrap.Collapse(cardID, {
				show: true
			});
		}
		card.parentNode.firstChild.firstChild.classList.remove('turned');
	}
}

function collapseAll () {
	const cardArray = document.querySelectorAll('.show');
	for (card of cardArray) {
		const cardID = document.getElementById(card.id);
		const bsCollapse = new bootstrap.Collapse(cardID, {
			show: false
		});
		card.parentNode.firstChild.firstChild.classList.add('turned');
	}
}

function collapseCompleted () {
	const cardArray = document.querySelectorAll('.completed');
	for (card of cardArray) {
		const collapse = card.children[1];
		const cardID = document.getElementById(collapse.id);
		if (collapse.classList.contains('show')) {
			const bsCollapse = new bootstrap.Collapse(cardID, {
				show: false
			});
			card.parentNode.firstChild.firstChild.firstChild.classList.add('turned');
		}
	}
}

for (const listIndex in checklistData) {
	const listGroup = checklistData[listIndex];
	checklistContent += `<div class="col"><div class="card" id="${listGroup.id}">`;
	checklistContent += `<div class="card-header">`;
	checklistContent += `<i class="bi bi-chevron-up" data-bs-toggle="collapse" data-bs-target="#collapse${listGroup.id}" aria-expanded="true" aria-controls="collapse${listGroup.id}" aria-label="Collapse this checklist group" role="button" tabindex="0" title="Collapse this checklist group"></i>`;
	checklistContent += `<h2>${listGroup.title}</h2></div>`;
	checklistContent += `<div class="card-body collapse show" id="collapse${listGroup.id}">`;
	checklistContent += `<i class="bi bi-arrow-counterclockwise" aria-label="Clear all checked items in this group" role="button" tabindex="0" title="Clear all checked items in this group"></i>`;
	checklistContent += `<div class="checklist">`;
	for (const itemIndex in listGroup.contents) {
		const item = listGroup.contents[itemIndex];
		checklistContent += `<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="${listGroup.id}-${item.id}"><label class="form-check-label" for="${listGroup.id}-${item.id}">${item.title}</label></div>`;
	}
	checklistContent += `</div></div></div></div>`;
}

checklistContent += `</div>`;

checklist.innerHTML = checklistContent;