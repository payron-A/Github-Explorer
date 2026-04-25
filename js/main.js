// ========================
// MAIN
// App state + all event listeners
// ========================
import { fetchUser, fetchRepos } from "./api.js";
import { showRepoData } from "./ui.js";
import { switchActive,focusHeaderInput } from "./utils.js";
// ────────────────────────────────
// DOM references
// ────────────────────────────────
const headerSearchIpt = document.getElementById("headerSearchIpt");
const headerSearchBtn = document.querySelector(".header-search-btn");
const searchReposIpt  = document.getElementById("searchRepos");
const filterBtns      = document.querySelector(".filter-repos");
// ────────────────────────────────
// App state
// ────────────────────────────────
const state = {repos: [],};

// ────────────────────────────────
// Search user
// ────────────────────────────────
async function handleSearch() {
    const username = headerSearchIpt.value.trim();
    if (!username) return;
    // Reset repo state on new search
    state.repos = [];
    searchReposIpt.value = "";

    // fetchUser triggers the card; repos come back via fetchRepos inside api.js
    // fetch Repos here 
    await fetchUser(username);
    // Re-fetch repos directly to cache them in state
    const repos = await fetchRepos(username);
    if (repos) state.repos = repos;
}

// ────────────────────────────────
// Filter repos by name (live search)
// ────────────────────────────────
function handleRepoSearch() {
    const query = searchReposIpt.value.toLowerCase().trim();
    const filtered = state.repos.filter(repo =>
        repo.name.toLowerCase().includes(query)
    );
    showRepoData(filtered);
}

// ────────────────────────────────
// Filter by "Most Starred"
// ────────────────────────────────
function handleFilterChange(e) {
    if (!e.target.dataset.searchtype) return; // guard: only filter buttons
    switchActive(e);
    switch(e.target.dataset.searchtype) {
        case "all":
            showRepoData(state.repos);
            break;
        case "starred":
            const sorted = [...state.repos].sort((a, b) =>
                b.stargazers_count - a.stargazers_count
            );
            showRepoData(sorted);
            break;
    }
}
// ────────────────────────────────
// Event listeners
// ────────────────────────────────
window.onload = focusHeaderInput(headerSearchIpt);
headerSearchBtn.addEventListener("click", handleSearch);
headerSearchIpt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
});
searchReposIpt.addEventListener("keyup", handleRepoSearch);

filterBtns.addEventListener("click", handleFilterChange);
