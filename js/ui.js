// ========================
// UI
// Responsible for: card, repos, errors, loader
// ========================
import { getDay } from "./utils.js";

const githubCard  = document.querySelector(".github-card");
const githubRepos = document.querySelector(".github-repos");
const repoMain    = document.querySelector(".repo-main");

// ────────────────────────────────
// Default / reset view
// ────────────────────────────────
export function defaultView() {
    githubCard.style.display    = "grid";
    githubCard.style.background = "var(--black-background)";
    githubCard.style.border     = "var(--border) solid 1px";
    githubCard.textContent      = "";
    githubCard.classList.remove("error-msg-animation");
}

// ────────────────────────────────
// Loading spinner
// ────────────────────────────────
export function showLoading() {
    githubCard.innerHTML = `
        <div class="loader">
            <div class="arc"></div>
            <div class="robot">
                <svg viewBox="0 0 760 760" xmlns="http://www.w3.org/2000/svg">
                    <rect width="760" height="760" fill="#0a0a0a"/>
                    <circle cx="380" cy="340" r="290" fill="#f5f5f5"/>
                    <path d="M 310 580 Q 310 490 340 465 Q 355 455 380 450 Q 405 455 420 465 Q 450 490 450 580 Z" fill="#0a0a0a"/>
                    <ellipse cx="380" cy="320" rx="175" ry="118" fill="#0a0a0a"/>
                    <ellipse cx="308" cy="325" rx="48" ry="52" fill="#f5f5f5"/>
                    <ellipse cx="452" cy="325" rx="48" ry="52" fill="#f5f5f5"/>
                </svg>
            </div>
        </div>`;
}

// ────────────────────────────────
// Error message
// ────────────────────────────────
export function showError(message) {
    defaultView();

    const wrapper = document.createElement("div");
    wrapper.classList.add("error-msg");
    wrapper.innerHTML = `
        <div>
            <i class="fa-solid fa-circle-xmark"></i>
            <span style="color:red">Wrong</span>
        </div>
        <div>${message}</div>`;

    githubCard.append(wrapper);
    githubCard.style.background = "var(--error-msg-background)";
    githubCard.classList.add("error-msg-animation");
    repoMain.textContent = "";
}

// ────────────────────────────────
// Github user card
// ────────────────────────────────
export function showCardData(data) {
    defaultView();
    githubCard.innerHTML = `
        <div class="img">
            <img src="${data.avatar_url}" id="githubImg" alt="Profile Photo">
        </div>
        <div class="card-content">
            <div class="card-description">
                <div>
                    <h2>${data.login}</h2>
                    <h3>${data.name ?? ""}</h3>
                </div>
                <a href="${data.html_url}">
                    <i class="fa-regular fa-user"></i>
                    <span>View Profile</span>
                </a>
            </div>
            <p>${data.bio ?? `${data.name} did not write a bio ...`}</p>
            <div class="meta-items">
                <span class="meta-item">
                    <i class="fa-solid fa-location-pin"></i>
                    <span>${data.location ?? "No location"}</span>
                </span>
                <span class="meta-item">
                    <i class="fa-solid fa-comment"></i>
                    <span>${data.email ?? "No Email"}</span>
                </span>
                <span class="meta-item">
                    <i class="fa-solid fa-clock"></i>
                    <span>${getDay(data.created_at)}</span>
                </span>
            </div>
        </div>
        <div class="more-info">
            <div class="stat-box">
                <div class="stat-icon"><i class="fa-solid fa-file-lines"></i></div>
                <div>
                    <p class="stat-val">${data.public_repos}</p>
                    <p class="stat-lbl">Repository</p>
                </div>
            </div>
            <div class="stat-box">
                <div class="stat-icon"><i class="fa-solid fa-heart-circle-plus"></i></div>
                <div>
                    <p class="stat-val">${data.followers}</p>
                    <p class="stat-lbl">Followers</p>
                </div>
            </div>
            <div class="stat-box">
                <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
                <div>
                    <p class="stat-val">${data.following}</p>
                    <p class="stat-lbl">Following</p>
                </div>
            </div>
            <div class="stat-box">
                <div class="stat-icon"><i class="fa-solid fa-users-rectangle"></i></div>
                <div>
                    <p class="stat-val">${data.public_gists}</p>
                    <p class="stat-lbl">Gists</p>
                </div>
            </div>
        </div>`;
}

// ────────────────────────────────
// Repositories list
// ────────────────────────────────
export function showRepoData(data) {
    githubRepos.style.display = "block";
    repoMain.innerHTML = data.map(repo => `
        <div class="repo-card">
            <div class="repo-head">
                <div class="repo-name">
                    <i class="fa-solid fa-folder-closed"></i>
                    <h3>${repo.name}</h3>
                </div>
                <div class="repo-type">${repo.owner.user_view_type ?? "public"}</div>
            </div>
            <div class="repo-bio">${repo.description ?? repo.name + "..."}</div>
            <div class="repo-footer">
                <div class="repo-language">
                    <i class="fa-solid fa-circle" style="color:white"></i>
                    <p>${repo.language ?? "No language"}</p>
                </div>
                <div class="repo-stars">
                    <i class="fa-solid fa-star"></i>
                    <p>${repo.stargazers_count}</p>
                </div>
                <div class="repo-work">
                    <i class="fa-solid fa-clock"></i>
                    <p>${getDay(repo.pushed_at)}</p>
                </div>
            </div>
        </div>`
    ).join("");
}
