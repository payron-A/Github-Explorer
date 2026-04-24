//==========
// HEAD & CARD ELEMENTS
//==========
const headerSearchIpt = document.getElementById("headerSearchIpt");
const headerSearchBtn = document.querySelector(".header-search-btn");
const githubCard = document.querySelector(".github-card");
//==========
// REPOS ELEMENT
//==========
const searchRepos = document.getElementById("searchRepos");
const filterBtns = document.querySelector(".filter-repos");
const githubRepos = document.querySelector(".github-repos");
let repoMain = document.querySelector(".repo-main");
let RepodataCP;// copy data(well use it before fitching card data);
//==========
// FETCH GITHUB DATA
//==========
async function getGithubApi(accountName){
    try{
        defaulCardView();
        loading();
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
        showCardError(error.message);
    }
}
//==========
// FETCH GITHUB REPOS
//==========
async function getRepoApi(accountName){
    try{
        const rs = await fetch(`https://api.github.com/users/${accountName}/repos`);
        if(!rs.ok){
            throw new Error("Something wrong!!");
            return;
        }
        const data = await rs.json();
        RepodataCP = data;
        showRepoData(data);
    }catch(error){
        showRepoError(error.message);
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
    defaulCardView();
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
                <p>${data.bio} || ${data.name} did not write a bio... </p>
                                <div class="meta-items">
                    <span class="meta-item">
                        <i class="fa-solid fa-location-pin"></i>
                        <span>${data.location || "No location"}</span>
                    </span>
                    <span class="meta-item">
                        <i class="fa-solid fa-comment"></i>
                        <span>${data.email || "No Email"}</span>
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
// DEFAUT VIEW
//==========
function defaulCardView(){
    githubCard.style.display = "grid";
    githubCard.style.background = "var(--black-background)";
    githubCard.style.border = "var(--border) solid 1px";
    githubCard.textContent = "";
    githubCard.classList.remove("error-msg-animation");

}
//==========
// SHOW CARD ERRORS
//==========
function showCardError(error){
    defaulCardView();
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
//==========
// SHOW REPO ERRORS
//==========
function showRepoError(error){
    githubRepos.style.display = "block";
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
    githubRepos.append(div);
    githubRepos.style.background = "var(--error-msg-background)";
    githubRepos.classList.add("error-msg-animation");
    
}
//==========
// GET DAY
//==========
// get created account date & last work in repo
function getDay(date){
    const createdAt = new Date(date);
    const currentDate = new Date();
    const diffMs = currentDate - createdAt;// get the date by "ms";
    const diffDays = Math.floor(diffMs/ (1000 *60 *60 * 24));// convert it to days;
    const diffMonths = Math.floor(diffDays / 30);//to months;
    const diffyears= Math.floor(diffDays / 365);//to years;
    if(diffyears > 0)return diffyears +"y";
    else if(diffMonths > 0)return diffMonths +"m";
    else if(diffDays == 0){
        return "Today";
    }
    return diffDays +"d";
}
//==========
// SHOW THE REPOS
//==========
function showRepoData(data){
    // make the repos area visibal;
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
        `).join("");
}
//==========
// SEARCH REPOS EVENT
//==========
// auto focus:
window.onload =()=>{
    headerSearchIpt.focus();
}
// keyup event:
searchRepos.onkeyup = ()=>{
    searchRepo(RepodataCP);
}
//==========
// SEARCH REPOS
//==========
function searchRepo(data){
    let searchValue = searchRepos.value.toLowerCase().trim();
    // filter the repos that has the same value of the input:
    let filterData = data.filter(repo => repo.name.toLowerCase().includes(searchValue));
    showRepoData(filterData);
}
//==========
// FILTER THE REPOS
//==========
filterBtns.onclick = (e)=>{
    switchActive(e);
    const searchtype = e.target.dataset.searchtype;
    switch(searchtype){
        case "all":// all(dafault)
            showRepoData(RepodataCP);//use the copy data(the origin data was changed)
            break;
        case "starred":// from the biggest repo stars to last one
            starredFilter();
            break;
    }
}
//==========
// FILTER THE REPOS (starred)
//==========
function starredFilter(){
    //use sort method to replace the repos by stars number
    const sorted = [...RepodataCP].sort((a,b)=>
        b.stargazers_count - a.stargazers_count
    );
    showRepoData(sorted);
}
//==========
// SWITCH ACTIVE
//==========
function switchActive(e){
        document.querySelectorAll("[data-searchType]").forEach(element =>{
            element.classList.remove("active");
        })
        e.target.classList.add("active");
}
//==========
// LOADING LOGO WHEN FITCH DATA
//==========
function loading(){
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
                </div>`
}