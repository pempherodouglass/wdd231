document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("currentyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const modifiedParagraph = document.getElementById("lastModified");
    if (modifiedParagraph) {
        modifiedParagraph.innerHTML = `Last Modification: ${document.lastModified}`;
    }
});

