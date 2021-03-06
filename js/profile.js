function changeCollapse () {
	const user = firebase.auth().currentUser;
	if (user) {
		const userData = db.collection('userData').doc(user.uid);
		userData.set({
			autoCollapse: document.getElementById('setCollapse').checked
		}, { merge: true }).catch ((error) => {
			console.error ('Error updating user data: ', error);
		});
	} else {
		console.log ('Error changing user settings.');
	}
}

// Fetch the database's profile data for the user and display it
function getProfileData (user) {
	// Fetch the user's data
	const userData = db.collection('userData').doc(user.uid);
	
	// Display the user's name
	document.getElementById('user-name').textContent = user.displayName;
	document.getElementById('user-name').innerHTML += '<button type="button" class="btn btn-sm btn-link btn-edit" data-bs-toggle="modal" data-bs-target="#editDisplayNameModal"><i class="bi bi-pencil-square"></i></button>';
	
	// Display the user's account details
	const details = document.getElementById('user-details');
	let detailsContent = `<h4>Your information</h4>`;
	detailsContent += `<div class="row"><div class="col-5 col-sm-4 col-md-3 col-xl-2"><p><strong>Email</strong></p></div><div class="col-7 col-sm-8 col-md-9 col-xl-10"><p id="email"></p></div></div>`;
	detailsContent += `<div class="row"><div class="col-5 col-sm-4 col-md-3 col-xl-2"><p><strong>Linked accounts</strong></p></div>`;
	detailsContent += `<div class="col-7 col-sm-8 col-md-9 col-xl-10">`;
	user.providerData.forEach((profile) => {
		const provider = profile.providerId;
		switch (provider) {
			case 'google.com':
				detailsContent += '<img src="assets/providers/google.svg" class="provider" alt="Google" width="24" height="24">';
				break;
			default:
				alert ('Error getting linked accounts');
		}
	});
	detailsContent += `</div>`;
	detailsContent += `<div class="col-12"><button class="btn btn-sm btn-link" onclick="resetPassword()">Send password reset email</button></div></row>`;
	details.innerHTML = detailsContent;
	
	document.getElementById('email').textContent = user.email;
	document.getElementById('email').innerHTML += `<button type="button" class="btn btn-sm btn-link btn-edit" data-bs-toggle="modal" data-bs-target="#editEmailModal"><i class="bi bi-pencil-square"></i></button>`;
	
	document.getElementById('settings').innerHTML = `<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="setCollapse"><label class="form-check-label" for="setCollapse">Auto-collapse completed checklist sections</label></div>`;
	
	// Check to see what user settings exist
	userData.get().then((doc) => {
		const data = doc.data();
		if (data.autoCollapse) {
			document.getElementById('setCollapse').checked = data.autoCollapse;
		} else {
			document.getElementById('setCollapse').checked = false;
		}
		document.getElementById('setCollapse').addEventListener("click", changeCollapse, false);
	}).catch((error) => {
		console.log('Error getting user settings: ', error);
	});
		
	document.getElementById('deleteDiv').innerHTML = '<hr><button class="btn btn-sm btn-outline-danger me-2 mb-2" data-bs-toggle="modal" data-bs-target="#clearModal">Clear all checked items</button>';
	document.getElementById('deleteDiv').innerHTML += '<button class="btn btn-sm btn-outline-danger mb-4" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete my account and data</button>';
}

// Changes the user's displayName
function changeName () {
	// Get the new name entered
	const newName = document.getElementById('newName').value;
	
	// If the user didn't enter a new name
	if (newName == null) {
		alert ('Please enter a new name.');
		return;
	}
	
	// Update the database with the new name
	const user = firebase.auth().currentUser;
	user.updateProfile({
		displayName: newName
	}).then(() => {
		location.reload();
	}).catch((error) => {
		console.log ('Error updating name: ', error);
	});
}

function changeEmail () {
	// Get the new name entered
	const newEmail = document.getElementById('newEmail').value;
	
	// If the user didn't enter a new name
	if (newEmail == null) {
		alert ('Please enter a new email address.');
		return;
	}

	var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (newEmail.match(validRegex)) {
		const user = firebase.auth().currentUser;
	
		user.updateEmail(newEmail).then(() => {
			location.reload();
		}).catch((error) => {
			alert ('Please sign in again to continue.');
			location.href = './signin.html';
		});
	} else {
		alert('Please enter a valid email address.');
		return;
	}
}

function resetPassword () {
	const user = firebase.auth().currentUser;
	const email = user.email;  
	firebase.auth().sendPasswordResetEmail(email)
	.then(() => {
		const toastDiv = document.getElementById('toast-container');
		toastDiv.innerHTML = `<div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true" id="resetToast"><div class="d-flex"><div class="toast-body">Password reset email sent.</div><button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div>`;
		const resetToast = document.getElementById('resetToast');
		const toast = new bootstrap.Toast(resetToast);
		toast.show();
	})
	.catch((error) => {
		console.log ('Error resetting password', error);
	});
}

function clearData () {
	const user = firebase.auth().currentUser;
	const userData = db.collection('userData').doc(user.uid);
	
	userData.set({
			cards: {}
		}, { merge: true }).catch ((error) => {
			console.error ('Error resetting user data: ', error);
		});
}

function deleteUser () {
	const user = firebase.auth().currentUser;
	const userData = db.collection('userData').doc(user.uid);
	
	userData.delete().then(() => {
		user.delete().then(() => {
			alert ('Your account and data has been deleted.');
			location.href = './index.html';
		}).catch((error) => {
			alert ('Please sign in again to continue.');
			location.href = './signin.html';
		});
	}).catch((error) => {
		console.error('Error deleting user data: ', error);
	});
}