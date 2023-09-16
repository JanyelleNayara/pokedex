const pokemonList = document.querySelector("#pokemon-list");
const pagination = document.querySelector("#load");

const limit = 4;
let offset = 0;
const maxRecords = 151;

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${pokemon.type}">${type}</li>`)
            .join("")}
        </ol>
        <img
            src="${pokemon.image}"
            alt="${pokemon.name}"
        />
      </div>
    </li>
    `;
}

function loadPokemonItems(limit, offset) {
  pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItems(limit, offset);

pagination.addEventListener("click", () => {
  offset += limit;
  const qtdItemsPage = offset + limit;

  if (qtdItemsPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(newLimit, offset);

    pagination.parentElement.removeChild(pagination);
  } else {
    loadPokemonItems(limit, offset);
  }
});
