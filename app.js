const darkModeToggle = document.getElementById("darkModeToggle");

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    // Save dark mode preference to local storage
    const isDarkModeEnabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
}

// Check if dark mode preference is saved in local storage
const isDarkModeSaved = localStorage.getItem("darkModeEnabled");
if (isDarkModeSaved === "true") {
    // Enable dark mode if it was saved as enabled
    document.body.classList.add("dark-mode");
}

// Add click event listener to the Dark Mode Toggle button
darkModeToggle.addEventListener("click", toggleDarkMode);
