let theInputOne =document.querySelector("#inputone")
let theInputTwo =document.querySelector("#inputtwo")
let startBtn = document.querySelector("#start-btn")
let profileOne = document.querySelector(".profile-one")
let profileTwo = document.querySelector(".profile-two")


startBtn.onclick = function() {
    compare();
}

function compare(){
    if(theInputOne.value == "" || theInputTwo.value == ""){
        alert("Type User Name");
    } else if(theInputOne.value == theInputTwo.value){
        alert("You entered the same username");
    }else{

        let token="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"
        fetch(`https://api.github.com/users/${theInputOne.value}`,{
          headers: {
            Authorization:`Bearer ${token}`
          }
        })
          .then((response) => response.json())
          .then((response) => {
            fetch(`https://api.github.com/users/${theInputTwo.value}`,{
          headers: {
            Authorization:`Bearer ${token}`
          }
        })
          .then((response) => response.json())
          .then((app) => {

            if(response.public_repos>app.public_repos){
                profileOne.innerHTML=`
                <h1 id="winner-color">Winner</h1>
                <br>
                <img class="images" src="${response.avatar_url}" alt="">
                <h2>${theInputOne.value}</h2>
                <br>
                <p>Number of repos: ${response.public_repos}</p>
                <p>Number of followers: ${response.followers}</p>
                <p>Twitter username: ${response.twitter_username}</p>
                
                `
                profileTwo.innerHTML=`
                <h1 id="looser-color">Looser</h1>
                <br>
                <img class="images" src="${app.avatar_url}" alt="">
                <h2>${theInputTwo.value}</h2>
                <br>
                <p>Number of repos: ${app.public_repos}</p>
                <p>Number of followers: ${app.followers}</p>
                <p>Twitter username: ${app.twitter_username}</p>
                `
            }else{
                profileOne.innerHTML=`
                <h1 id="looser-color">Looser</h1>
                <br>
                <img class="images" src="${response.avatar_url}" alt="">
                <h1>${theInputOne.value}</h1>
                <br>
                <p>Number of repos: ${response.public_repos}</p>
                <p>Number of followers: ${response.followers}</p>
                <p>Twitter username: ${response.twitter_username}</p>
                `
                profileTwo.innerHTML=`
                <h1 id="winner-color">Winner</h1>
                <br>
                <img class="images" src="${app.avatar_url}" alt="">
                <h2>${theInputTwo.value}</h2>
                <br>
                <p>Number of repos: ${app.public_repos}</p>
                <p>Number of followers: ${app.followers}</p>
                <p>Twitter username: ${app.twitter_username}</p>
                `
            }

          })
          })

}
}

let body =document.body
let darkMode =document.querySelector("#dark-mode-icon")

darkMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode")
})