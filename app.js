// This event waits until the full HTML page is loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Lesson Booking App loaded successfully!");
});
// ---------------------------------------------
// LESSON DATA (Front-End Version)
// ---------------------------------------------
// This array represents all the lessons available in the system.
// Each lesson is stored as an object with 5 properties:
// - id: A unique identifier for each lesson
// - subject: Name of the subject being taught
// - location: Where the lesson takes place
// - price: Cost per lesson in £
// - spaces: Number of available seats left
// ---------------------------------------------

const lessons = [
    { id: 1, subject: "Mathematics", location: "Hendon",       price: 100, spaces: 5 },
    { id: 2, subject: "English",     location: "Colindale",    price: 80,  spaces: 5 },
    { id: 3, subject: "Biology",     location: "Golders Green",price: 90,  spaces: 5 },
    { id: 4, subject: "Chemistry",   location: "Brent Cross",  price: 70,  spaces: 5 },
    { id: 5, subject: "History",     location: "Hendon",       price: 50,  spaces: 5 },
    { id: 6, subject: "Physics",     location: "Colindale",    price: 95,  spaces: 5 },
    { id: 7, subject: "Art",         location: "Brent Cross",  price: 60,  spaces: 5 },
    { id: 8, subject: "Geography",   location: "Golders Green",price: 85,  spaces: 5 },
    { id: 9, subject: "Computer Science", location: "Hendon", price: 120, spaces: 5 },
    { id:10, subject: "Economics",   location: "Colindale",    price: 110, spaces: 5 }
];

// Log to confirm data loaded correctly
console.log("Lessons data loaded:", lessons);
// --------------------------------------------------------
// FUNCTION: renderLessons()
// --------------------------------------------------------
// This function displays all lessons on the page.
// It loops through the lessons array and creates HTML
// for each lesson card dynamically using JavaScript.
//
// This is how the front-end "builds" the UI.
// --------------------------------------------------------
function renderLessons() {
    // Select the container in index.html where lessons will appear
    const container = document.getElementById("lesson-container");

    // Clear anything that was previously inside
    container.innerHTML = "";

    // Loop through each lesson in the lessons array
    lessons.forEach(lesson => {

        // Create a new card for each lesson
        const card = document.createElement("div");
        card.className = "lesson-card"; // Style comes from style.css

        // Add the lesson information inside the card
        card.innerHTML = `
            <h2>${lesson.subject}</h2>
            <p><strong>Location:</strong> ${lesson.location}</p>
            <p><strong>Price:</strong> £${lesson.price}</p>
            <p><strong>Spaces:</strong> ${lesson.spaces}</p>
        `;

        // Add the card to the page
        container.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("Lesson Booking App loaded!");

    // Call the function to show lessons on page load
    renderLessons();
});