const baseURL = 'http://localhost:7000';
const winesURL = `${baseURL}/wines`;

const varietalsListUl = document.getElementById('varietals-list-ul');
const winesList = document.getElementById('wines-list-ul');
const addNewWine = document.getElementById('add-wine-form');

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

function displayWinesList(wines) {
    winesList.innerHTML = '';
    wines.map(wine => {
        const wineData = document.createElement('li');
        wineData.innerHTML = `<a href=showWine/showWine.html?id=${wine.id}>${wine.varietal}, ${wine.producer}, ${wine.region}, ${wine.vintage}</a>`
        winesList.append(wineData);
    })
}

addNewWine.addEventListener('submit', makeNewWine);

function makeNewWine(event) {
    event.preventDefault(); 
    
    const wineFormData = new FormData(event.target);
    const varietal = wineFormData.get('varietal');
    const producer = wineFormData.get('producer');
    const region = wineFormData.get('region');
    const vintage = wineFormData.get('vintage');
    const numberInCollection = wineFormData.get('number-in-collection');

    console.log(varietal, producer, region, vintage, numberInCollection)

    fetch(winesURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                varietal: varietal,
                producer: producer,
                region: region,
                vintage: vintage,
                number_in_collection: numberInCollection
            })
        })
            .then(parseJSON)
            .then(console.log);
    }