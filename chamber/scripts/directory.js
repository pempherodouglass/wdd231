const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

const directoryContainer = document.querySelector("#directory-container");
const gridViewBtn = document.querySelector("#grid-view-btn");
const listViewBtn = document.querySelector("#list-view-btn");
const membersURL = "data/members.json";

async function loadMembers() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        renderMembers(members);
    } catch (error) {
        console.error("Error loading member directory:", error);
        directoryContainer.innerHTML = "<p>Unable to load member directory at this time.</p>";
    }
}

function formatMembershipLevel(level) {
    switch (level) {
        case 3:
            return "Gold Member";
        case 2:
            return "Silver Member";
        default:
            return "Member";
    }
}

function renderMembers(members) {
    directoryContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        const logo = document.createElement("img");
        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} logo`;
        logo.loading = "lazy";
        logo.width = 120;
        logo.height = 80;

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const link = document.createElement("a");
        link.href = member.website;
        link.textContent = member.website.replace(/^https?:\/\//, "");
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const badge = document.createElement("span");
        badge.classList.add("membership-tag");
        badge.textContent = formatMembershipLevel(member.membershipLevel);

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(link);
        card.appendChild(badge);

        directoryContainer.appendChild(card);
    });
}

gridViewBtn.addEventListener("click", () => {
    directoryContainer.classList.add("grid-view");
    directoryContainer.classList.remove("list-view");
    gridViewBtn.classList.add("active-btn");
    listViewBtn.classList.remove("active-btn");
});

listViewBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list-view");
    directoryContainer.classList.remove("grid-view");
    listViewBtn.classList.add("active-btn");
    gridViewBtn.classList.remove("active-btn");
});

loadMembers();
