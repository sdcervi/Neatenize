const db = firebase.firestore();

// Get user data; if data does not exist, initialize
function getUserData (user) {
	const userData = db.collection('userData').doc(user.uid);
	userData.get().then((doc) => {
        if (doc.exists) {
			if (document.location.pathname == '/index.html' || document.location.pathname == '/profile.html' ) {
				getProfileData (user);
			} else {
				return;
			}
		} else {
			userData.set({
				cards: {}
			}).then(() => {
				return;
			}).catch((error) => {
				console.error('Error creating user data: ', error);
			});
		}
    }).catch((error) => {
		console.log('Error getting user data: ', error);
	});
}

// Log the user out
function logout () {
	firebase.auth().signOut()
		.then(function() {
			location.href = 'index.html';
		})
		.catch(function(error) {
			console.log ('Sign out error');
		});
}

// Check whether the user is logged in
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		document.getElementById('signInButton').remove();
		document.getElementById('profileDropdown').style.display = 'block';
		document.getElementById('profileUser').textContent = user.displayName;
		getUserData(user);
	} else {
		if (document.getElementById('signInButton')) {
			document.getElementById('signInButton').style.display = 'block';
		}
		document.getElementById('profileDropdown').remove();
	}
});
