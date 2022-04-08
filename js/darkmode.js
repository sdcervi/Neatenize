const lightModeButton = document.getElementById('lightModeButton');
const darkModeButton = document.getElementById('darkModeButton');

const userDarkMode = localStorage.getItem('neatizeDarkMode') || 'light';

if (userDarkMode === 'light') {
	document.body.classList.remove('dark-mode');
	lightModeButton.classList.add('btn-secondary');
	lightModeButton.classList.remove('btn-outline-light');
	darkModeButton.classList.add('btn-outline-secondary');
	darkModeButton.classList.remove('btn-light');
	localStorage.setItem('neatizeDarkMode', 'light');
} else if (userDarkMode === 'dark') {
	document.body.classList.add('dark-mode');
	darkModeButton.classList.add('btn-light');
	darkModeButton.classList.remove('btn-outline-secondary');
	lightModeButton.classList.add('btn-outline-light');
	lightModeButton.classList.remove('btn-secondary');
	localStorage.setItem('neatizeDarkMode', 'dark');
} else {
	console.log ('Error setting dark mode.');
}

function toggleDarkMode (mode) {
	switch (mode) {
		case 'light':
			document.body.classList.remove('dark-mode');
			lightModeButton.classList.add('btn-secondary');
			lightModeButton.classList.remove('btn-outline-light');
			darkModeButton.classList.add('btn-outline-secondary');
			darkModeButton.classList.remove('btn-light');
			localStorage.setItem('neatizeDarkMode', 'light');
			break;
		case 'dark':
			document.body.classList.add('dark-mode');
			darkModeButton.classList.add('btn-light');
			darkModeButton.classList.remove('btn-outline-secondary');
			lightModeButton.classList.add('btn-outline-light');
			lightModeButton.classList.remove('btn-secondary');
			localStorage.setItem('neatizeDarkMode', 'dark');
			break;
	}
}