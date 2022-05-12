// Create event listeners for user clicking on anything in the webpage
// Thanks to event delegation, this bubbles up with the unique element each time
if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
} else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

// Checks if all checkboxes in a card are checked
function checkComplete (listBox, listSet, autoCollapse) {
	let listComplete = [];
	for (listItem of listSet) {
		listComplete.push(listItem.firstChild.checked);
	}
	if (listComplete.every(value => value === true)) {
		listBox.classList.add('completed');
	} else {
		listBox.classList.remove('completed');
	}
	
	// If user has auto-collapse enabled
	if (autoCollapse) {
		collapseCompleted();
	}
}

function toggleChecked (itemFullID) {
	const item = document.getElementById(itemFullID);
	const itemID = itemFullID.substring(itemFullID.indexOf('-') + 1);
	const listBox = item.parentNode.parentNode.parentNode.parentNode;
	const listBoxID = listBox.id;
	
	const user = firebase.auth().currentUser;
	if (user) {
		const userData = db.collection('userData').doc(user.uid);
		userData.set({
			cards: {
				[listBoxID]: {
					[itemID]: item.checked
				}
			}
		}, { merge: true }).then(() => {
			const listSet = document.getElementById(`collapse${listBoxID}`).children[1].childNodes;
			checkComplete (listBox, listSet);
		}).catch ((error) => {
			console.error ('Error updating user data: ', error);
		});
	} else {
		const listSet = document.getElementById(`collapse${listBoxID}`).children[1].childNodes;
		checkComplete (listBox, listSet);
	}
}

function clearCard (cardID) {
	const card = document.getElementById(cardID);
	const checklist = card.children[1].children;
	for (listItem of checklist) {
		if (listItem.firstChild.checked) {
			listItem.firstChild.checked = false;
			toggleChecked(listItem.firstChild.id);
		}
	}
}

// Event handler for user clicks
function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    let element = event.target;

    // Climb up the document tree from the target of the event
    while (element) {
        if (element.nodeName === "DIV" && /form-check/.test(element.className)) {
            // The user clicked on a <div> or clicked on an element inside a <div> with class "form-check"
            toggleChecked(element.firstChild.id);
            break;
        } else if (element.nodeName === "I" && /bi-chevron-up/.test(element.className)) {
			element.classList.toggle('turned');
		} else if (element.nodeName === "I" && /bi-x-circle/.test(element.className)) {
			clearCard(element.parentNode.id);
		}

        element = element.parentNode;
    }
}

// Gets the already-completed items from user data and checks those boxes
function writeChecklist (checklist, autoCollapse) {
	if (Object.keys(checklist).length) {
		for (const listID in checklist) {
			// Get the HTML element containing the list's card
			const listBox = document.getElementById(listID);
			
			// Check boxes user has already completed
			const list = checklist[listID];
			for (const item in list) {
				const itemCheckbox = document.getElementById(`${listID}-${item}`);
				const itemStatus = list[item];
				if (itemStatus) {
					itemCheckbox.checked = itemStatus;
				}
			}
			
			// Get array of all checkboxes in the list, and mark as complete if everything is checked
			const listSet = document.getElementById(`collapse${listID}`).children[1].childNodes;
			checkComplete (listBox, listSet, autoCollapse);
		}
	} else {
		return;
	}
}

// Fetch the database's profile data for the user and display it
function getProfileData (user) {
	// Fetch the user's data
	const userData = db.collection('userData').doc(user.uid);
	
	// Check to see if user has checklist progress in the database
	userData.get().then((doc) => {
		const data = doc.data();
		if (data.cards) {
			writeChecklist (data.cards, data.autoCollapse);
		} else {
			console.log ('Error getting user data: no data present');
		}
	}).catch((error) => {
		console.log('Error getting user data: ', error);
	});
}