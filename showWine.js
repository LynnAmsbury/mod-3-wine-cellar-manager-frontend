const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')

const baseURL = 'http://localhost:7000';
const winesURL = `${baseURL}/wines`;
const individualWineURL = `${baseURL}/wines/${id}`;

fetch(individualWineURL)
    .then(parseJSON)
    .then(showIndividualWine);

function parseJSON(response) {
    return response.json();
}

function showIndividualWine(wine){
    renderWineData(wine.varietal, wine.producer, wine.region, wine.vintage, wine.number_in_collection)
}

const individualWine = document.getElementById('individual-wine')

function renderWineData(varietal, producer, region, vintage, number_in_collection){
    const varietalElement = document.createElement('h1')
    varietalElement.innerText = varietal

    const producerElement = document.createElement('h2')
    producerElement.innerText = producer

    const regionElement = document.createElement('h2')
    regionElement.innerText = region

    const vintageElement = document.createElement('h2')
    vintageElement.innerText = vintage

    const numberInCollectionElement = document.createElement('h2')
    numberInCollectionElement.innerText = number_in_collection
    
    individualWine.append(varietalElement, producerElement, regionElement, vintageElement, numberInCollectionElement)
}