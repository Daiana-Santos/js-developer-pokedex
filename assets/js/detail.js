//Variáveis
const urlParams = new URLSearchParams(window.location.search);
const pokeID = urlParams.get('idPokemon');

// Nova função para listagem de Pokemons
function convertPokemonToLiDetail(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detailImg">
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
        <div class="detailPoke">
            <ol class="details">
                <li class="experience">Base Experience: ${pokemon.base_experience}</li>
                <li class="height">Height: ${pokemon.height}</li>
                <li class="weight">Weight: ${pokemon.weight}</li>
            </ol>
            <ol class="skills">
                <span class="name">Skills</span>
                ${pokemon.skills.map((skill) => `<li class="skill ${skill}">${skill}</li>`).join('')}
            </ol>
           
        </div>
        <div class="moves">
            <ol class="moves">
                <span class="name">Moves</span>
                ${pokemon.moves.map((move) => `<li class="move ${move}">${move}</li>`).join('')}
            </ol>
        </div>
        
    </li>
    `
}
//Convertendo a lista de Descrição de Pokemon em html
function loadPokemonDetail(pokeID) {
    pokeApi.getPokemon(pokeID).then((pokemon) => {
        const newHtml = convertPokemonToLiDetail(pokemon)
        pokemonDetail.innerHTML += newHtml
    })
}

loadPokemonDetail(pokeID)