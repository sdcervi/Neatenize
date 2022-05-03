// Checks if all checkboxes in a card are checked
function checkComplete (listBox, listSet) {
	let listComplete = [];
	for (listItem of listSet) {
		listComplete.push(listItem.firstChild.checked);
	}
	if (listComplete.every(value => value === true)) {
		listBox.classList.add('completed');
	} else {
		listBox.classList.remove('completed');
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
			const listSet = document.getElementById(`collapse${listBoxID}`).firstChild.childNodes;
			checkComplete (listBox, listSet);
		}).catch ((error) => {
			console.error ('Error updating user data: ', error);
		});
	} else {
		const listSet = document.getElementById(`collapse${listBoxID}`).firstChild.childNodes;
		checkComplete (listBox, listSet);
	}
}

// Gets the already-completed items from user data and checks those boxes
function writeChecklist (checklist) {
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
			const listSet = document.getElementById(`collapse${listID}`).firstChild.childNodes;
			checkComplete (listBox, listSet);
		}
	} else {
		return;
	}
}

// Fetch the database's profile data for the user and display it
function getProfileData (user) {
	// Fetch the user's data
	const userData = db.collection('userData').doc(user.uid);
	
	// Check to see if user has challenges in the database
	userData.get().then((doc) => {
		const data = doc.data();
		if (data.cards) {
			writeChecklist (data.cards);
		} else {
			console.log ('Error getting user data: no data present');
		}
	}).catch((error) => {
		console.log('Error getting user data: ', error);
	});
}