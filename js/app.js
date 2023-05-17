// Main Variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let container = document.querySelector(".container");
let profile = document.querySelector(".profile");
let tabs = document.querySelector(".tabs");
let repos = document.querySelector(".repos");
getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  if (theInput.value == "") {
    alert("Enter username");
  } else {
    // to prevent form value
    event.preventDefault();
    // it expire in 30 days
    let token="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"
    fetch(`https://api.github.com/users/${theInput.value}`,{
      headers: {
        Authorization:`Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((response) => {
        const avatarUrl = response.avatar_url;
        profile.innerHTML = `
            <a href="#"><img src="${avatarUrl}" alt="" class="profile-pic"></a>
                <p>${theInput.value}</p>
                <button id="profile-btn">Edit profile</button>`;
        tabs.innerHTML = `
            <a href="#">Overview</a>
            <a href="#">Repositories</a>
            <a href="#">Projects</a>
            <a href="#">Packages</a>
            <a href="#">Stars</a>`;
      });
    fetch(`https://api.github.com/users/${theInput.value}/repos`,{
      headers: {
        Authorization:`Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((repositories) => {
        repos.innerHTML=""
        for (let i = 0; i < repositories.length; i++) {
          let repo = document.createElement("div");
          repo.className = "repo";
          repo.innerHTML = `
          <a href="${repositories[i].clone_url}" target="_blank">${repositories[i].name}</a>
          <p class="public-word">Public</p>
          <p class="type-file">${repositories[i].language}</p>
          `;
          repos.appendChild(repo);
        }
      });
  }
}
// catch error repeat static responsive style
let body =document.body
let darkMode =document.querySelector("#dark-mode-icon")

darkMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode")
})