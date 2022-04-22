const checklist = document.getElementById('checklistContainer');
let checklistContent = `<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">`;

function swapCollapse (cardID) {
	const icon = document.getElementById(cardID).children[0].children[0];
	//icon.classList.remove('collapsed');
	icon.classList.toggle('bi-arrows-collapse');
	icon.classList.toggle('bi-arrows-expand');
}

for (const listIndex in checklistData) {
	const listGroup = checklistData[listIndex];
	checklistContent += `<div class="col"><div class="card" id="${listGroup.id}">`;
	checklistContent += `<div class="card-header">`;
	checklistContent += `<i class="bi bi-arrows-collapse" data-bs-toggle="collapse" data-bs-target="#collapse${listGroup.id}" aria-expanded="true" aria-controls="collapse${listGroup.id}" onclick="swapCollapse('${listGroup.id}')" role="button"></i>`;
	checklistContent += `<h2>${listGroup.title}</h2></div>`;
	checklistContent += `<div class="card-body collapse show" id="collapse${listGroup.id}"><div class="checklist">`;
	for (const itemIndex in listGroup.contents) {
		const item = listGroup.contents[itemIndex];
		checklistContent += `<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="${listGroup.id}-${item.id}"><label class="form-check-label" for="${listGroup.id}-${item.id}">${item.title}</label></div>`;
	}
	checklistContent += `</div></div></div></div>`;
}

checklistContent += `</div>`;

checklist.innerHTML = checklistContent;