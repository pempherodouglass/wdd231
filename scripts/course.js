const courses = [
    { id: "CSE 110", subject: "CSE", number: 110, title: "Programming Building Blocks", credits: 2, completed: true },
    { id: "CSE 111", subject: "CSE", number: 111, title: "Programming with Functions", credits: 3, completed: true },
    { id: "WDD 130", subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
    { id: "WDD 131", subject: "WDD", number: 131, title: "Web Frontend Development I", credits: 3, completed: true },
    { id: "WDD 231", subject: "WDD", number: 231, title: "Web Frontend Development II", credits: 4, completed: false }
];

function renderCourses(filter) {
    const grid = document.getElementById("course-cards");
    const creditsValue = document.getElementById("total-credits");
    if (!grid) return;

    const filteredCourses = filter === "all" 
        ? courses 
        : courses.filter(c => c.subject.toUpperCase() === filter.toUpperCase());

    grid.innerHTML = filteredCourses.map(course => `
        <div class="course-card ${course.completed ? 'completed' : 'pending'}">
            <h3>${course.id}</h3>
            <p>${course.title}</p>
            <p>Credits: ${course.credits}</p>
        </div>
    `).join("");

    const calculatedCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsValue.textContent = calculatedCredits;
}

document.addEventListener("DOMContentLoaded", () => {
    renderCourses("all");

    document.getElementById("btn-all")?.addEventListener("click", (e) => updateActiveFilter(e.target, "all"));
    document.getElementById("btn-cse")?.addEventListener("click", (e) => updateActiveFilter(e.target, "cse"));
    document.getElementById("btn-wdd")?.addEventListener("click", (e) => updateActiveFilter(e.target, "wdd"));
});

function updateActiveFilter(button, track) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderCourses(track);
}
