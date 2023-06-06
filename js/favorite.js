// Retrieve favorites from local storage
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function showFavorites() {
  const mainContainer = document.getElementById('main-container');
  mainContainer.innerHTML = "";

  favorites.forEach(superHero => {
    const { name, description, thumbnail, id } = superHero;
    const { path, extension } = thumbnail;
    const superHeroEl = document.createElement('div');
    superHeroEl.innerHTML = `<div class="col" data-id="${id}">
                          <div class="card">
                            <button class="container-heart remove-btn"><i class="fa-solid fa-heart"></i></button>
                            <img src="${path}.${extension}" class="card-img-top" alt="${name}">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">${description}</p>
                                <a href="superhero_info.html?id=${id}"><button>Learn More..</button></a>
                            </div>
                          </div>
                        </div>`;

    mainContainer.appendChild(superHeroEl);
  });

  const removeButtons = mainContainer.getElementsByClassName('remove-btn');
  Array.from(removeButtons).forEach(button => {
    button.addEventListener('click', function () {
      const superHeroId = parseInt(button.parentNode.parentNode.getAttribute('data-id'));
      removeFavorite(superHeroId);
    });
  });
}

function removeFavorite(superHeroId){
  const index = favorites.findIndex(superHero => superHero.id === superHeroId);
  if(index !== -1){
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Superhero removed successfully');
  }
  showFavorites();
}

showFavorites();
