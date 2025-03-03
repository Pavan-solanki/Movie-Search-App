
const url = `https://advanced-movie-search.p.rapidapi.com/search/movie?query=`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '2c4fb0a414mshd18ad28c70bc62dp1ab70ajsn51e56eb33a6d',
		'x-rapidapi-host': 'advanced-movie-search.p.rapidapi.com'
	}
};

// Select the container where movie cards will be displayed
const movieContainer = document.getElementById("row");

// Async function to fetch movie data
async function fetchMovies(query="Avengers") {
    try {
        const response = await fetch(url+encodeURIComponent(query), options);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Movies Data:", data.results);
        showMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Function to display movie cards
function showMovies(movies) {
    movieContainer.innerHTML = ""; // Clear previous movie cards

    movies.forEach((movie) => {
        const box = document.createElement("div");
        box.classList.add("movie-card");
        box.innerHTML = `
            <img src="${movie.poster_path}" alt="${movie.original_title}">
            <div class="overlay">
                <div class="movie-title">${movie.original_title}</div>
                <div class="rating">⭐ ${movie.vote_average|| "10"}</div>
                <div class="overview">${movie.overview || "No description available"}</div>
            </div>
        `;
        movieContainer.appendChild(box);
    });
}

// Search functionality
document.querySelector(".search-bar button").addEventListener("click", function () {
    const searchInput = document.querySelector(".search-bar input").value;
    if (searchInput.trim() !== "") {
        console.log("Search Input:",searchInput);
        fetchMovies(searchInput);
    } else {
        fetchMovies(); // Fetch trending movies if search is empty
    }
});

// Load trending movies on page load
fetchMovies();
