const courses = [
    { id: "CSE 110", subject: "CSE", number: 110, title: "Programming Building Blocks", credits: 2 },
    { id: "CSE 111", subject: "CSE", number: 111, title: "Programming with Functions", credits: 3 },
    { id: "WDD 130", subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2 },
    { id: "WDD 131", subject: "WDD", number: 131, title: "Web Frontend Development I", credits: 3 },
    { id: "WDD 231", subject: "WDD", number: 231, title: "Web Frontend Development II", credits: 4 }
];

function renderCourses(filterType) {
    const container = document.getElementById("course-cards");
    const totalCreditsSpan = document.getElementById("total-credits");
    if (!container) return;

    // Filter logic using functional arrays
    const filtered = filterType === "all" 
        ? courses 
        : courses.filter(course => course.subject.toLowerCase() === filterType.toLowerCase());

    // Generate output utilizing exclusive string interpolation templates
    container.innerHTML = filtered.map(course => `
        <div class="course-card ${course.subject.toLowerCase()}">
            <strong>${course.id}</strong> - ${course.title} (${course.credits} Credits)
        </div>
    `).join("");

    // Calculate aggregated context weight dynamically via reduce
    const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

document.addEventListener("DOMContentLoaded", () => {
    // Initial paint
    renderCourses("all");

    // Dynamic state listener bindings
    document.getElementById("btn-all")?.addEventListener("click", (e) => {
        toggleActiveClass(e.target);
        renderCourses("all");
    });
    document.getElementById("btn-cse")?.addEventListener("click", (e) => {
        toggleActiveClass(e.target);
        renderCourses("cse");
    });
    document.getElementById("btn-wdd")?.addEventListener("click", (e) => {
        toggleActiveClass(e.target);
        renderCourses("wdd");
    });
});

function toggleActiveClass(activeButton) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}
