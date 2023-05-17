const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const content = document.querySelector(".content");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">Nº ${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
      )
      .join("");
    pokemonList.innerHTML += newHtml;

    const pokemonsInfo = document.querySelectorAll(".pokemon");
    clickPokemonDetail(pokemonsInfo);
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function clickPokemonDetail(pokemonsInfo) {
  pokemonsInfo.forEach((pokemonInfo, index) => {
    pokemonInfo.addEventListener("click", () => {
      console.log(index + 1);

      pokeApi2.getPokemons(index + 1).then((pokemon) => {
        const newWindowHTML = document.createElement("div");
        newWindowHTML.innerHTML = `
        <div id="pokemonInfoDetail" class="pokemonInfo ${pokemon.types[0].type.name}">
          <header class="info__header">
            <img id="btnBack" src="./assets/img/back.svg" alt="Ícone voltar">
            <img id="heart" src="./assets/img/heart.svg" alt="ícone favoritar">
          </header>

          <section class="info__top">
            <div class="info__util">
              <div>
                <span class="info__name">${pokemon.name}</span>
                <ol class="info__types">
                    ${pokemon.types
                      .map((Slot) => `<li class="info__type ${Slot.type.name}">${Slot.type.name}</li>`)
                      .join("")}
                </ol>
                <img class="info__gif" src="${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}" />
                <img class="info__photo" src="${pokemon.sprites.other.dream_world.front_default}" />
              </div>
              <span class="info__id">Nº ${pokemon.id}</span>
            </div>
          </section>

          <section class="info">
              <ul class="info__menu">
                  <li class="info__list">
                      <button autofocus class="info__title a">About</button>
                      <ul class="info__info ai">
                          <li>Species <span class="info__results">${pokemon.species.name}</span></li>
                          <li>Height <span class="info__results">${pokemon.height}</span></li>
                          <li>Weight <span class="info__results">${pokemon.weight} kg</span></li>
                      </ul>
                  </li>
                  <li class="info__list">
                      <button class="info__title e">Abilities</button> 
                      <ul class="info__info ei">
                        ${pokemon.abilities
                          .map((Slot) => `<li><span class="info__results">${Slot.ability.name}</li>`)
                          .join("")}
                      </ul>
                  </li>
                  <li class="info__list">
                      <button class="info__title m">Moves</button>
                      <ul class="info__info mi">
                          <li>Move <span class="info__results">${pokemon.moves[0].move.name}</span></li>
                          <li>Move <span class="info__results">${pokemon.moves[1].move.name}</span></li>
                          <li>Move <span class="info__results">${pokemon.moves[2].move.name}</span></li>
                          <li>Move <span class="info__results">${pokemon.moves[3].move.name}</span></li>
                      </ul>
                  </li>
              </ul>
          </section>
        </div>`;

        content.appendChild(newWindowHTML);
        

        const heart = document.getElementById("heart")
        heart.addEventListener("click", () => {
          console.log("clicou")
        })

        const pokemonInfoDetail = document.getElementById("pokemonInfoDetail");
        const btnBack = document.getElementById("btnBack");
        btnBack.addEventListener("click", () => {
          pokemonInfoDetail.remove(pokemonInfoDetail);
        });
      });
    });
  });
}