const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.innerHTML = isOpen ? "&times;" : "☰";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

const currentWeatherDiv = document.querySelector("#current-weather");
const forecastDiv = document.querySelector("#weather-forecast");

const apiKey = "574c4f759cdbdd4be682a0c4b02a26c3";
const lat = -13.9626;
const lon = 33.7741;
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherURL);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        currentWeatherDiv.innerHTML = "<p>Weather data unavailable right now.</p>";
    }
}

function displayWeather(data) {
    const [current] = data.list;
    const [weatherInfo] = current.weather;
    const temp = Math.round(current.main.temp);
    const desc = weatherInfo.description;
    const iconCode = weatherInfo.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    currentWeatherDiv.innerHTML = `
        <div class="current-weather-row">
            <img src="${iconUrl}" alt="${desc}" width="64" height="64">
            <div>
                <p><strong>${temp}&deg;C</strong></p>
                <p style="text-transform: capitalize;">${desc}</p>
                <p>Humidity: ${current.main.humidity}%</p>
            </div>
        </div>
    `;

    const [todayDate] = new Date().toISOString().split("T");
    const dailyForecasts = data.list
        .filter((item) => item.dt_txt.includes("12:00:00") && !item.dt_txt.startsWith(todayDate))
        .slice(0, 3);

    forecastDiv.innerHTML = "";
    dailyForecasts.forEach((day) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const dayTemp = Math.round(day.main.temp);

        const row = document.createElement("div");
        row.classList.add("forecast-day");
        row.innerHTML = `
            <span>${dayName}</span>
            <strong>${dayTemp}&deg;C</strong>
        `;
        forecastDiv.appendChild(row);
    });
}

const spotlightContainer = document.querySelector("#spotlight-container");
const membersURL = "data/members.json";

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

async function loadSpotlights() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();

        const eligibleMembers = members.filter(
            (member) => member.membershipLevel === 2 || member.membershipLevel === 3
        );

        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, 3);

        renderSpotlights(selectedMembers);
    } catch (error) {
        console.error("Error loading spotlights:", error);
        spotlightContainer.innerHTML = "<p>Unable to load member spotlights at this time.</p>";
    }
}

function renderSpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const logo = document.createElement("img");
        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} logo`;
        logo.loading = "lazy";
        logo.width = 120;
        logo.height = 80;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const address = document.createElement("p");
        address.textContent = member.address;

        const link = document.createElement("a");
        link.href = member.website;
        link.textContent = member.website.replace(/^https?:\/\//, "");
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const badge = document.createElement("span");
        badge.classList.add("membership-tag");
        badge.textContent = formatMembershipLevel(member.membershipLevel);

        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(link);
        card.appendChild(badge);

        spotlightContainer.appendChild(card);
    });
}

fetchWeather();
loadSpotlights();
