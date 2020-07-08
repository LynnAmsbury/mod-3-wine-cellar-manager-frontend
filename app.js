console.log("running on localhost:3000")

const baseURL = 'http://localhost:7000'
const winesURL = 'http://localhost:7000/wines'


fetch(winesURL)
    .then(parseJSON)
    .then(console.log)

function parseJSON(response) {
    return response.json();
}
