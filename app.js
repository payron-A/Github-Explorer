//==========
// ELEMENTS
//==========
const headerSearchIpt = document.getElementById("headerSearchIpt");
const headerSearchBtn = document.querySelector(".header-search-btn");
const searchRepos = document.getElementById("searchRepos");
const githubRepos = document.querySelector(".github-repos");
let repoMain = document.querySelector(".repo-main");
const githubCard = document.querySelector(".github-card");

//==========
// FETCH GITHUB DATA
//==========
async function getGithubApi(accountName){
    try{
        defaultView();
        githubCard.innerHTML = "Loading...";
        const rs = await fetch(`https://api.github.com/users/${accountName}`);
        if(!rs.ok){
            if(rs.status == 403){
                throw new Error("Api limit exceeded!, Try later");
            }else{
                throw new Error('User not found!');
            }
            return;
        }
        const data = await rs.json();
        showCardData(data);
        getRepoApi(accountName);
    }catch(error){
        showError(error.message);
    }
}
//==========
// FETCH GITHUB REPOS
//==========
async function getRepoApi(accountName){
    try{
        const rs = await fetch(`https://api.github.com/users/${accountName}/repos`);
        if(!rs.ok){
            return;
        }
        const data = await rs.json();
        showRepoData(data);
    }catch(error){
        console.log(error.message)
    }
}
//==========
// GET DATA
//==========
// keyup event to fetch the data when the user write;
headerSearchBtn.onclick =()=> {
    getGithubApi(headerSearchIpt.value.trim());
}
//==========
// SHOW HTML CARD
//==========
function showCardData(data){
    
    defaultView()
    githubCard.innerHTML =`
        <div class="img">
                <img src=${data.avatar_url}id="githubImg" alt="Profile Photo">
            </div>
            <div class="card-content">
                <div class="card-description">
                    <div>
                        <h2>${data.login}</h2>
                        <h3>${data.name}</h3>
                    </div>
                    <a href=${data.html_url}>
                        <i class="fa-regular fa-user"></i>
                        <span>View Profile</span>
                    </a>
                </div>
                <p>${!data.bio?`${data.name} did not write a bio ...`:data.bio}</p>
                                <div class="meta-items">
                    <span class="meta-item">
                        <i class="fa-solid fa-location-pin"></i>
                        <span>${!data.location?'No location':data.location}</span>
                    </span>
                    <span class="meta-item">
                        <i class="fa-solid fa-comment"></i>
                        <span>${!data.email?"No Email":data.email}</span>
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
            </div>`
}
//==========
// SHOW THE ERRORS
//==========
function defaultView(){
    githubCard.style.display = "grid";
    githubCard.style.background = "var(--black-background)";
    githubCard.style.border = "var(--border) solid 1px";
    githubCard.textContent = "";
    githubCard.classList.remove("error-msg-animation");

}
function showError(error){
    defaultView();
    const div = document.createElement("div");
    div.classList.add("error-msg");
    const WrongIcon = document.createElement("div");
    WrongIcon.innerHTML =`
            <i class="fa-solid fa-circle-xmark"></i>
            <span style="color:red">Wrong</span>
    `;
    const msg = document.createElement("div");
    msg.textContent = error;
    div.append(WrongIcon);
    div.append(msg);
    githubCard.append(div);
    githubCard.style.background = "var(--error-msg-background)";
    githubCard.classList.add("error-msg-animation");
    
}
function getDay(date){
    const createdAt = new Date(date);
    const currentDate = new Date();
    const diffMs = currentDate - createdAt;
    const diffDays = Math.floor(diffMs/ (1000 *60 *60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffyears= Math.floor(diffDays / 365);
    if(diffyears > 0)return diffyears +"y";
    else if(diffMonths > 0)return diffMonths +"m";
    else if(diffDays == 0){
        return "This day"
    }
    return diffDays +"d";
}
function showRepoData(data){
    githubRepos.style.display = "block";
    repoMain.innerHTML = data.map(repo =>`
            <div class="repo-card">
                    <div class="repo-head">
                        <div class="repo-name">
                            <i class="fa-solid fa-folder-closed"></i>
                            <h3>${repo.name}</h3>
                        </div>
                        <div class="repo-type">${repo.owner.user_view_type}</div>
                    </div>
                    <div class="repo-bio">${!repo.description?repo.name+"...":repo.description}</div>
                    <div class="repo-footer">
                        <div class="repo-language">
                            <i class="fa-solid fa-circle"style="color:white"></i>
                            <p>${!repo.language?"No language":repo.language}</p>
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
            </div>
        `).join("")
}