//==========
// ELEMENTS
//==========
const headerSearchIpt = document.getElementById("headerSearchIpt");
const headerSearchBtn = document.querySelector(".header-search-btn");
const searchRepos = document.getElementById("searchRepos");
const githubRepos = document.querySelector(".github-repos");
const githubCard = document.querySelector(".github-card");

//==========
// FETCH GITHUB DATA
//==========
async function getGithubApi(accountName){
    try{
        const rs = await fetch(`https://api.github.com/users/${accountName}`);
        const data = await rs.json();
        // click event to show the card
        headerSearchBtn.onclick =()=>{
            if(rs.ok)showCardData(data);
            else{showError(`Enter the exact name`)}
        }  
    }catch(error){
        showError(error);
    }

}
//==========
// GET DATA
//==========
// keyup event to fetch the data when the user write;
headerSearchIpt.onkeyup =()=> {
    getGithubApi(headerSearchIpt.value.trim());
}
//==========
// SHOW HTML CARD
//==========
function showCardData(data){
    githubCard.style.border = "var(--border) solid 1px";
    githubCard.textContent = "";
    let createdAt = data.created_at.split("-");
    let day = new Date();
    githubCard.style.display = "grid";
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
                <p>${!data.bio?`${data.name} dosent wrote an bio ...`:data.bio}</p>
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
                        <span>${
                                    (day.getFullYear() - Number(createdAt[0])) == 0 
                                    ? day.getMonth() - Number(createdAt[1]) + "m ago"
                                    : day.getFullYear() - Number(createdAt[0])+"y ago"
                            }
                        </span>
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

function showError(error){
    // githubCard.textContent = "";
    // githubCard.style.display = "grid";
    
    // githubCard.classList.add('error')
    // let h3 = document.createElement("h3");
    // let ErrorDiv = document.createElement("div");
    // h3.textContent = "Opss";
    // h3.style.color = "var(--title-color)";
    // h3.style.gridColumn= "1/-1";
    // ErrorDiv.style.color = "red";
    // ErrorDiv.textContent = error;
    // githubCard.append(h3);
    // githubCard.append(ErrorDiv);
    githubCard.innerHTML = `
        <div class="error-msg">
                <i class="fa-solid fa-exclamation"></i>
                <div>
                    <h3>Opss</h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
        </div>
    `
    githubCard.style.border = "red solid 3px";
    githubCard.style.background = "rgba(255, 0, 0, 0.222)";
}