const PRIVATE_KEY = "6f1a89d730f44fd9b1b7db5aa0b6339ad20599b7";
const PUBLIC_KEY = "27703b18adc065408255814cb8011481";
const ts = new Date().getTime();
let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

// Call the DOM function
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const main = document.getElementById('main');

const total = 1562;
const limit = 90;
let offset = 0;

const baseUrl = `https://gateway.marvel.com:443/v1/public/characters`;
let superHeroData = [];

async function fetchSuperHero() {

    while (offset < total) {
        const apiUrl = `${baseUrl}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}`;
        const Response = await fetch(apiUrl);
        const data = await Response.json();
        let results = data.data.results; // Assign the fetched data to superHeroData
        superHeroData.push(...results);
        offset += limit;
        console.log(superHeroData)
    }
    showSuperHeros(superHeroData);
}
fetchSuperHero();


function showSuperHeros(superHeroData) {
    main.innerHTML = "";

    superHeroData.forEach(superHero => {
        const { name, description, thumbnail } = superHero;
        const { path, extension } = thumbnail;
        const superHeroEl = document.createElement('div');
        superHeroEl.innerHTML = `<div class="col">
                            <div class="card">
                                <span class="container-heart"><i class="fa-solid fa-heart"></i></span>
                                <img src="${path}.${extension}" class="card-img-top" alt="${name}">
                                <div class="card-body">
                                    <h5 class="card-title">${name}</h5>
                                    <p class="card-text">${description}</p>
                                    <a href="superehero_info.html"><button>Learn More..</button></a>
                                </div>
                            </div>
                    </div>`;

        main.appendChild(superHeroEl);
    });
}

search.addEventListener('input', function () {
    const searchQuery = search.value.toLowerCase();
    const filteredSuperHeroes = superHeroData.filter(superhero =>
        superhero.name.toLowerCase().includes(searchQuery)
    );
    showSuperHeros(filteredSuperHeroes);
});

searchButton.addEventListener('click', function(e){
    e.preventDefault();
    const searchQuery = search.value.toLowerCase();
    const filteredSuperHeroes = superHeroData.filter(superhero =>
        superhero.name.toLowerCase().includes(searchQuery)
    );
    showSuperHeros(filteredSuperHeroes);
})