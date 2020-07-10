const baseURL = 'http://localhost:7000';
const winesURL = `${baseURL}/wines`;

// const open = document.getElementById("open")

function parseJSON(response) {
    return response.json();
}

function getAllWines() {
    return fetch(winesURL)
        .then(parseJSON)
}
getAllWines().then((response) => {
    varietalsList(response);
})
// Display varietals list
// const varietalsArray = ["Cabernet Sauvignon", "Pinot Noir", "Zinfandel"]
const varietalsListUl = document.getElementById("varietals-list-ul")

function varietalsList(wines) {
    return wines.forEach(wine => {
        const li=document.createElement("li")
        const button = document.createElement("button")
        button.textContent = wine.varietal
        button.classList.add("de-button")
        li.appendChild(button);
        li.addEventListener("click", (event) => {
            showWineList(event)
        })
        varietalsListUl.append(li)
    })
}

function showWineList(event) {
    fetch(winesURL)
        .then(parseJSON)
        .then(result => sortWinesList(result, event.target.innerText));
     
}

function sortWinesList(allWinesList, varietal) {

    const sortedWineList = allWinesList.filter(wine => {
        if (wine.varietal == varietal) {
            return wine
        }
        
    })
    displayWinesList(sortedWineList)
}

const winesList = document.getElementById('wines-list-ul');

// Functionality to display indes wines list as a ul list
function displayWinesList(wines) {
    // console.log(wines)
    wines.map(wine => {
        // console.log(wine)
        const wineData = document.createElement('li');
        wineData.innerHTML = `<a href=showWine/showWine.html?id=${wine.id}>${wine.varietal}, ${wine.producer}, ${wine.region}, ${wine.vintage}</a>`
        winesList.innerHTML = '';
        winesList.append(wineData);
    })
}