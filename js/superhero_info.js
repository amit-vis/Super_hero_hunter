const urlParams = new URLSearchParams(window.location.search);
const superHeroId = urlParams.get('id');


async function fetchSuperHero() {
    let PRIVATE_KEY = "94261f5fc418821ff5b9a28e72f26db313559ef3";
    let PUBLIC_KEY = "4394820eb8acb48d36735143326c4930";
    let ts = new Date().getTime();
    let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${superHeroId}`;
    const apiUrl = `${baseUrl}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }
    const data = await response.json();
    console.log(data);
    const heroData = data.data.results[0];
    return heroData;
}
fetchSuperHero();

async function showSuperHeroDetails() {
    const heroData = await fetchSuperHero();
    const { name, description, thumbnail, id, comics, stories, series } = heroData;
    const { path, extension } = thumbnail;
    const { available } = comics;

    document.getElementById('hero-image').src = `${path}.${extension}`;
    document.getElementById('hero-name').textContent = `Name:- ${name}`;
    document.getElementById('hero-description').textContent = `${description}`
    document.getElementById('hero-id').textContent = `Id:- ${id}`;
    document.getElementById('hero-comics').textContent = `comics:- ${available}`;
    document.getElementById('hero-story-count').textContent = `Story Count:- ${stories.available}`;
    document.getElementById('hero-series-count').textContent = `Series Count:- ${series.available}`;

    const storyContainer = document.getElementById('hero-story');
    storyContainer.innerHTML = '';

    stories.items.forEach(story => {
        const { name } = story;

        const paraTag = document.createElement('span');
        paraTag.setAttribute('class', 'hero-story-name');
        paraTag.textContent = `Story Name: ${name} `;

        storyContainer.appendChild(paraTag);
    });

    const seriesContainer = document.getElementById('hero-series');
    seriesContainer.innerHTML = '';

    series.items.forEach(series =>{
        const {name} = series;
        const serieName =document.createElement('span');
        serieName.setAttribute('id', 'hero-series-name');
        serieName.textContent = `Series Name:- ${name} `;

        seriesContainer.appendChild(serieName);
    })

}


showSuperHeroDetails();