// Load completed courses from localStorage
document.addEventListener('DOMContentLoaded', () => {
    updateBadges();
});

function completeCourse(courseId) {
    let completed = JSON.parse(localStorage.getItem('completedCourses') || "[]");
    if (!completed.includes(courseId)) {
        completed.push(courseId);
        localStorage.setItem('completedCourses', JSON.stringify(completed));
        alert("Course completed!");
        updateBadges();
    }
}

function updateBadges() {
    let completed = JSON.parse(localStorage.getItem('completedCourses') || "[]");
    const cadetBadge = document.getElementById('badge-cadet');
    const scholarBadge = document.getElementById('badge-scholar');
    const message = document.getElementById('badge-message');

    if (completed.length >= 1) {
        cadetBadge.classList.add('active');
        message.textContent = "You are now an Official Interstellar Space Cadet!";
    }

    if (completed.length >= 2) {
        scholarBadge.classList.add('active');
        message.textContent = "You have reached the rank of Interstellar Scholar!";
    }
}
