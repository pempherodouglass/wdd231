const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
  primaryNav.classList.toggle('open');
  const isOpen = primaryNav.classList.contains('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? '✕' : '☰';
});

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Get form data from URL
const params = new URLSearchParams(window.location.search);
const results = document.querySelector('#results');

results.innerHTML = `
  <p><strong>First Name:</strong> ${params.get('fname')}</p>
  <p><strong>Last Name:</strong> ${params.get('lname')}</p>
  <p><strong>Email:</strong> ${params.get('email')}</p>
  <p><strong>Mobile Phone:</strong> ${params.get('phone')}</p>
  <p><strong>Business / Organization:</strong> ${params.get('business')}</p>
  <p><strong>Submitted On:</strong> ${params.get('timestamp')}</p>
`;
