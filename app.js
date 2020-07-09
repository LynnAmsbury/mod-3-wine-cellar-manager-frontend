const baseURL = 'http://localhost:7000';
const winesURL = `${baseURL}/wines`;

function parseJSON(response) {
    return response.json();
}

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

function showWineList(event) {
    console.log(event.target.innerText) // is working when varietal is listed
    // Take event.target.innerText; use it to sort through the fetch response and return the wine for which the varietal matches the clicked-on varietal in varietalList
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
        const wineData = document.createElement('h3');
        wineData.innerHTML = `<a href=showWine/showWine.html?id=${wine.id}>${wine.varietal}, ${wine.producer}, ${wine.region}, ${wine.vintage}</a>`
        winesList.append(wineData);
    })
}