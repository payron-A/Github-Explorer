// ========================
// API
// All fetch calls live here
// ========================
import { defaultView, showLoading, showError, showCardData, showRepoData } from "./ui.js";
const BASE_URL = "https://api.github.com";
// ────────────────────────────────
// Fetch user profile
// ────────────────────────────────
export async function fetchUser(username) {
    try {
        defaultView();
        showLoading();
        const res = await fetch(`${BASE_URL}/users/${username}`);

        if (!res.ok) {
            const msg = res.status === 403
                ? "API rate limit exceeded! Try later."
                : "User not found!";
            throw new Error(msg);
        }

        const data = await res.json();
        showCardData(data);

        // Kick off repos fetch in parallel (non-blocking for the card)
        fetchRepos(username);

    } catch (error) {
        showError(error.message);
    }
}
// ────────────────────────────────
// Fetch user repositories
// Returns the data so callers can cache it
// ────────────────────────────────
export async function fetchRepos(username) {
    try {
        const res = await fetch(`${BASE_URL}/users/${username}/repos`);
        if (!res.ok) return null;

        const data = await res.json();
        showRepoData(data);
        return data;

    } catch (error) {
        console.error("Repos fetch error:", error.message);
        return null;
    }
}
