// Main Variables
const theInput = document.querySelector(".get-repos input");
const getButton = document.querySelector(".get-button");
const container = document.querySelector(".container");
const profile = document.querySelector(".profile");
const tabs = document.querySelector(".tabs");
const repos = document.querySelector(".repos");

getButton.addEventListener("click", getRepos);

function getRepos() {
  if (theInput.value === "") {
    alert("Enter username");
    return;
  }

  const token = "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";
  event.preventDefault();
  fetch(`https://api.github.com/users/${theInput.value}`)
    .then(response => response.json())
    .then(response => {
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
    })
    .catch(error => {
      console.error(error);
      alert("sorry there is an error, please try later");
    });

  fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then(response => response.json())
    .then(repositories => {
      repos.innerHTML = "";
      for (const repository of repositories) {
        const repo = document.createElement("div");
        repo.className = "repo";
        repo.innerHTML = `
          <a href="${repository.clone_url}" target="_blank">${repository.name}</a>
          <p class="public-word">Public</p>
          <p class="type-file">${repository.language}</p>`;
        repos.appendChild(repo);
      }
    })
    .catch(error => {
      console.error(error);
      alert("sorry there is an error, please try later");
    });
}

const body = document.body;
const darkMode = document.querySelector("#dark-mode-icon");

darkMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
