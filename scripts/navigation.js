document.addEventListener("DOMContentLoaded", () => {
    const navButton = document.querySelector("#ham-btn");
    const navLinks = document.querySelector("#nav-bar");

    if (navButton && navLinks) {
        navButton.addEventListener("click", () => {
            document.body.classList.toggle("show");
            navLinks.classList.toggle("show");
        });
    }
});


