let PRIVATE_KEY = "94261f5fc418821ff5b9a28e72f26db313559ef3";
let PUBLIC_KEY = "4394820eb8acb48d36735143326c4930";
let ts = new Date().getTime();
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

        if (!Response.ok) {
            throw new Error(`Failed to fetch data. Status: ${Response.status}`);
        }

        const data = await Response.json();
        let results = data.data.results; // Assign the fetched data to superHeroData
        superHeroData.push(...results);
        offset += limit;
        console.log(superHeroData.events)
    }
    showSuperHeros(superHeroData);
}
fetchSuperHero();


function showSuperHeros(superHeroData) {
    main.innerHTML = "";

    superHeroData.forEach(superHero => {
        const { name, description, thumbnail, id } = superHero;
        const { path, extension } = thumbnail;
        const superHeroEl = document.createElement('div');
        superHeroEl.innerHTML = `<div class="col">
                            <div class="card">
                            <button class="container-heart" onclick="addFavorites(${id})"><i class="fa-solid fa-heart"></i></button>
                                <img src="${path}.${extension}" class="card-img-top" alt="${name}">
                                <div class="card-body">
                                    <h5 class="card-title">${name}</h5>
                                    <p class="card-text">${description}</p>
                                    <a href="superhero_info.html?id=${id}"><button>Learn More..</button></a>
                                </div>
                            </div>
                    </div>`;

        main.appendChild(superHeroEl);
    });
}

function addFavorites(superHeroId) {
    const selectedSuperHero = superHeroData.find(superHero => superHero.id === superHeroId);
    if (selectedSuperHero) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const isAlreadyFavorite = favorites.some(superHero => superHero.id === selectedSuperHero.id);
        if (isAlreadyFavorite) {
            alert('SuperHro is already in favorites');
            return;
        }
        favorites.push(selectedSuperHero);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Superhero added to favorites:', selectedSuperHero);
    }
    const heartButton = document.getElementsByClassName(`button[class="${superHeroId}"]`);
    console.log('heartButton',heartButton)
    if (heartButton) {
        heartButton.style.backgroundColor = 'red';
    }
}



search.addEventListener('input', function () {
    const searchQuery = search.value.toLowerCase();
    const filteredSuperHeroes = superHeroData.filter(searchsuperhero =>
        searchsuperhero.name.toLowerCase().includes(searchQuery)
    );
    showSuperHeros(filteredSuperHeroes);
});

searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    const searchQuery = search.value.toLowerCase();
    const filteredSuperHeroes = superHeroData.filter(searchsuperhero =>
        searchsuperhero.name.toLowerCase().includes(searchQuery)
    );
    showSuperHeros(filteredSuperHeroes);
})