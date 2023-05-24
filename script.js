//You can edit ALL of the code here
const lable = document.getElementById("lable");
const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();
const select = document.querySelector("#select");
const searchBar = document.querySelector("#search-bar");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  let output ="";
  episodeList.forEach((episode) => {
       
    let seasonNum = episode.season.toString().padStart(2, "0");
     let episodeNum = episode.number.toString().padStart(2, "0");
     output +=`
     <div style="background-color:white; width:270px;">
     <h1 style="color:black;">${episode.name} - S${seasonNum}E${episodeNum}</h1>
     <img src="${episode.image.medium}"></img>
     <div><p>${episode.summary}</p></div>
     </div>
     `;
   
    
  });

  const rootElem = document.getElementById("root");
  rootElem.innerHTML = output;
  let episodeNumber = document.createElement("div");
  episodeNumber.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.appendChild(episodeNumber);
  
  return output;
 
}

window.onload = setup();





// 

const input = document.querySelector("#search-bar");
input.addEventListener("keyup" , function (e) {
  let result = "";
  const inputValue = e.target.value;
  const allEpisodes = getAllEpisodes();
  let inputValueInsensitive = new RegExp(inputValue,"i");
  let selectedEpisodes = allEpisodes.filter((episode) =>{
    if (
      episode.name.match(inputValueInsensitive) !== null ||
      episode.summary.match(inputValueInsensitive) !== null
    ) {
      return episode;
    }
  });
console.log(selectedEpisodes);
  result = makePageForEpisodes(selectedEpisodes);
  lable.innerText = `Displaying ${selectedEpisodes.length}/${allEpisodes.length} episodes`;
});

//select element 
allEpisodes.forEach((episode) => {
let option = document.createElement("option");
let seasonEpisodeNumber = getSeasonEpisodeNumber(episode);
option.innerText = `${episode.name} ${seasonEpisodeNumber}`;
select.appendChild(option);
});

//get season&episode number
function getSeasonEpisodeNumber(episode) {
  let seasonString = episode.season.toString().padStart(2, "0");
  let episodeString = episode.number.toString().padStart(2, "0");
  return `-S${seasonString} E${episodeString}`;
}


//get one option
select.addEventListener("change" , (event) => {
  rootElem.textContent = "";

  if (event.target.value !== "all episodes") {
    console.log(event.target,value);
    searchBar.value = "";
    const selectedEpisode = event.target.value.slice(-2);
    const selectedSeason = event.target.value.slice(-5, -3);
    const selectedMovie = allEpisodes.filter((episode) =>{
      if (episode.season == selectedSeason && episode.number == selectedEpisode){
        return episode;
      }
    });
    rootElem.innerHTML = makePageForEpisodes(selectedMovie);
  } else {
    searchBar.value = "";
    setup();
  }
})

//fill selectShow
allShow.sort((a,b) =>
a.name.toLowerCase().localCompare(b.name.toLowerCase())
);

allShows.forEach((show) =>{
  let option = document.createElement("option");
  option.innerText = `${show.name}`;
  selectShow.appendChild(option);
})

//choose episode
selectShow.addEventListener("change", (event) =>{
  rootElem.textContent = "";
  lable.innerText = `Display 0 / 0 episodes`;
  let showName = event.target.value;

  let showSelected = allShows.find((show) => show.name === showName );
  let showId = showSelected.id;
  })

  function fetchEpisodesForShow(showId) {
    fetch(`https://api.tvmaze.com/shows/${showId} / episodes`)
    .then((Response)=>Response.json())
    .then((result) => { makePageForEpisodes(result);
    select.innerText="";
    fillSelectBox(result);
    allFetchEpisodes = result
  })
    
  }

  //level 500
  //create HTML form
  function makePageForShow(){
    let output = "";
    allShows.sort((a , b) => a.name.toLowerCase().localCompare(b.name.toLowerCase()));
    allShows.forEach(show =>{
      output += `
      <div id="showPage">
        <div id="divShowImg">
        <img src="${show.image !== null ? show.image.medium : ""}">
      </div>
      <div id= "divShowSummery">
      <h1 style="text-align:center;">${show.name}</h1>
      <p>${show.summary}</p>
      </div>
      <div id=divShowUl">
      <ul>
        <li>rated:${show.rating.average}</li>
        <li>Genres:${show.genres}</li>
        <li>Status:${show.status}</li>
        <li>Runtime:${show.runtime}</li>
      </ul>
    </div>
  </div>
  `;
    });
    ShadowRoot.innerHTML = output;
  }

  //EventListener for button
  GamepadButton.addEventListener("click" , (event)=>{
    event.preventDefault();
    rootElem.textContent ="";
    input.value = "";
    makePageForShow(allShows);
  })