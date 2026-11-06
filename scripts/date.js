document.addEventListener("DOMContentLoaded", () => {
    // Inject the current year automatically
    const yearSpan = document.getElementById("currentyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Inject the real file modification metadata text
    const modificationParagraph = document.getElementById("lastModified");
    if (modificationParagraph) {
        modificationParagraph.textContent = `Last Modification: ${document.lastModified}`;
    }
});
