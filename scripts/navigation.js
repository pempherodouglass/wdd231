// Store the button element
const navbutton = document.querySelector("#ham-btn");
const navlinks = document.querySelector("#nav-bar");

// Toggle the 'show' class on the body when clicked
navbutton.addEventListener("click", () => {
    document.body.classList.toggle("show");
    navlinks.classList.toggle("show");
});

