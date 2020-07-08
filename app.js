const baseURL = 'http://localhost:7000';
const winesURL = `${baseURL}/wines`;

fetch(winesURL)
    .then(parseJSON)
    // .then(displayWinesList);
    .then(showWineCards);

function parseJSON(response) {
    return response.json();
}

const winesList = document.getElementById('wines-list-ul');

function displayWinesList(wines) {
    // console.log(wines)
    wines.map(wine => {
        // console.log(wine)
        const wineData = document.createElement('h6');
        wineData.innerHTML = `<a href=wineCard.html?id=${wine.id}>${wine.varietal}, ${wine.producer}, ${wine.region}, ${wine.vintage}</a>`
        winesList.append(wineData);
    })
}

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