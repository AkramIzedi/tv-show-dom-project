//You can edit ALL of the code here
const lable = document.getElementById("lable");

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