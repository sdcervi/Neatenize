// Generate header and write contents to page

const header = document.getElementById('header');

let headerContents = `<nav class="navbar">`;

headerContents += `<div class="container">`;

headerContents += `<div class="dark-mode-toggle" id="darkModeToggle"><div class="btn-group" role="group" aria-label="Toggle dark mode">`;
headerContents += `<button type="button" class="btn btn-sm btn-outline-light" onclick="toggleDarkMode('light')" id="lightModeButton" aria-label="Change to light mode"><i class="bi bi-brightness-high"></i></button>`;
headerContents += `<button type="button" class="btn btn-sm btn-light" onclick="toggleDarkMode('dark')" id="darkModeButton" aria-label="Change to dark mode"><i class="bi bi-moon"></i></button>`;
headerContents += `</div></div>`;

headerContents += `<div class="sign-in">`;
if (window.location.pathname != '/signin.html') {
	headerContents += `<a href="./signin.html" id="signInButton"><button type="button" class="btn btn-primary btn-sm">Sign In</button></a>`;
}
headerContents += `<div class="dropdown" id="profileDropdown">`;
headerContents += `<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Toggle profile drop-down"><i class="bi bi-person-circle"></i><span id="profileUser" class="d-none d-sm-inline"></span></button>`;
headerContents += `<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">`;
headerContents += `<li><a class="dropdown-item" href="./profile.html">Profile &amp; Settings</a></li>`;
headerContents += `<li><hr class="dropdown-divider"></li>`;
headerContents += `<li><a class="dropdown-item" onclick="logout()" href="#">Sign out</a></li>`;
headerContents += `</ul>`;
headerContents += `</div>`;
headerContents += `</div>`;

headerContents += `<div><a class="navbar-brand" href="#"><img src="./assets/logo/logo.svg" width="100" height="100" alt=""><br><h1>Neatenize</h1></a></div>`;

headerContents += `</div>`;

headerContents += `<div class="container"><h2>A simple, minimalist clean-up checklist for a simple, minimalist&nbsp;environment</h2></div>`;
headerContents += `<div class="container" id="nav-links"><ul class="navbar-nav">`;
headerContents += `<li class="nav-item"><a class="nav-link" href="./index.html">Home</a></li>`;
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
	headerContents += `<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#aboutModal">About</a></li>`;
	headerContents += `<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#keepModal">When to keep what?</a></li>`;
	headerContents += `<li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#betaModal">Beta testers</a></li>`;
}
headerContents += `</ul></div>`;

headerContents += `<div class="container d-block"><hr></div>`;

headerContents += `</nav>`;

header.innerHTML = headerContents;

// Generate footer and write contents to page

const footer = document.getElementById('footer');

let footerContents = `<div class="container">`;
footerContents += `<p class="d-print-none">Designed &amp; built by <a href="https://stephaniecervi.net">Stephanie Cervi</a><br>`;
footerContents += `<span class="small"><a href="./privacy-policy.html">Privacy Policy</a> | <a href="./terms-of-service.html">Terms of Service</a></span></p>`;
footerContents += `<p class="d-none d-print-block"><a href="https://neatenize.app">neatenize.app</a></p>`;
footerContents += `</div>`;

footer.innerHTML = footerContents;