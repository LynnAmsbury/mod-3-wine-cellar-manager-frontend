const baseURL = 'http://localhost:7000';
const winesURL = `${baseURL}/wines`;

fetch(winesURL)
    .then(parseJSON)
    .then(displayWinesList); // To display wines as a list
    // .then(showWineCards); // To display wines as cards

function parseJSON(response) {
    return response.json();
}

// From Stack Overflow
// var submit = document.getElementById("submit");
// var input = document.getElementById("input");

// submit.addEventListener("click", function(){
//   var listUl = document.getElementById("list");
//   var listLi = document.createElement("li");
//   var value = input.value;
//   listUl.appendChild(listLi)
//   listLi.textContent = value;
//   gettingThisLi();
// });

// var print = function(){
//   console.log(this.innerHTML)
//   };

// function gettingThisLi(){
//   var lis = document.querySelectorAll("li");

//   for (var i = 0; i < lis.length; i++){
//    var listElement = lis[i];
//    listElement.removeEventListener("click",print);
//    listElement.addEventListener("click",print);
//  }
  
// }

// <input type="text" id="input"></input>
// <button id="submit" type="submit"> Submit </button>

//   <ul id ="list">

//   </ul>

// Display varietals list
const varietalsArray = ["Cabernet Sauvignon", "Pinot Noir", "Zinfandel"]
const varietalsUl = document.getElementById("varietals-list")

varietalsList()

function varietalsList() {
    return varietalsArray.forEach(varietal => {
        let li=document.createElement("li")
        li.textContent = varietal
        li.addEventListener("click", (event) => {
            showWineList(event)
        })
        varietalsUl.append(li)
    })
}

function showWineList() {
    console.log(event.target.innerText) // is working when varietal is listed
    // Take event.target.innerText; use it to sort through the fetch response and return the wine for which the varietal matches the clicked-on varietal in varietalList
    
}

const winesList = document.getElementById('wines-list-ul');

// Functionality to display indes wines list as a ul list
function displayWinesList(wines) {
    // console.log(wines)
    wines.map(wine => {
        // console.log(wine)
        const wineData = document.createElement('h3');
        wineData.innerHTML = `<a href=showWine.html?id=${wine.id}>${wine.varietal}, ${wine.producer}, ${wine.region}, ${wine.vintage}</a>`
        winesList.append(wineData);
    })
}
























// Functionality to display the index wines list as a list of cards
function showWineCards(wines) {
    // console.log('wines:', wines)
    const winesCardSection = document.getElementById('wine-card-section');
    wines.forEach((wine) => showWine(wine, winesCardSection));
}

function showWine(wine, winesCardSection) {
    const wineCard = document.createElement('div');
    wineCard.classList.add('wine-card');

    const varietal = document.createElement('h2');
    varietal.textContent = wine.varietal;

    const producer = document.createElement('h4');
    producer.textContent = wine.producer;

    const region = document.createElement('h4');
    region.textContent = wine.region;

    const vintage = document.createElement('h4');
    vintage.textContent = wine.vintage;

    const numberInCollection = document.createElement('h4');
    numberInCollection.textContent = wine.number_in_collection;


    wineCard.append(varietal, producer, region, vintage, numberInCollection);


    winesCardSection.append(wineCard)
}