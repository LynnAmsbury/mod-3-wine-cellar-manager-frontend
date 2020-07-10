const baseURL = 'http://localhost:7000';
const winesURL = `${baseURL}/wines`;

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

const varietalsListUl = document.getElementById("varietals-list-ul")
function getDeduplicatedWines(wines, propertyToDeduplicateBy) {
    return wines.reduce((accumulator, currentWine) => {
        const matches = accumulator.filter(currentWineInAccumulator => {
            return currentWineInAccumulator[propertyToDeduplicateBy] === currentWine[propertyToDeduplicateBy];
        });
        return matches.length ?
          accumulator :
          accumulator.concat(currentWine);
    }, []);
}

function varietalsList(wines) {
    const deduplicatedWines = getDeduplicatedWines(wines, 'varietal');
    return deduplicatedWines.forEach(wine => {
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
function displayWinesList(wines) {
    winesList.innerHTML = '';
    wines.map(wine => {
        const wineData = document.createElement('li');
        wineData.innerHTML = `<a href=showWine/showWine.html?id=${wine.id}>${wine.varietal}, ${wine.producer}, ${wine.region}, ${wine.vintage}</a>`
        winesList.append(wineData);
    })
}