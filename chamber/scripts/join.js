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

// Set hidden timestamp when the page loads
const timestampField = document.querySelector('#timestamp');
timestampField.value = new Date().toLocaleString();

// Open modals when Learn More links are clicked
const infoLinks = document.querySelectorAll('.info-link');
infoLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = link.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.showModal();
  });
});

// Close modals when Close button is clicked
const closeButtons = document.querySelectorAll('.close-btn');
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('dialog');
    modal.close();
  });
});
