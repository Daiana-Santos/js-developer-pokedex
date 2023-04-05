//Variáveis para as funções
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadDetailsButton = document.getElementById('loadDetailsButton')
const moreDetailClass = document.getElementsByClassName('moreDetail')

const maxRecords = 151
const limit = 10
let offset = 0;

// Função original para listar os Pokemons
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
    </li>
    `
}

// Nova função para Descrição dos Pokemons
function convertPokemonToLiDetail(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <a href="pokeDetail.html?idPokemon=${pokemon.number}" class="pokeLink">
            <span class="name">${pokemon.name}</span>
        </a>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
        <div class="moreDetail">
            <ol class="details">
               <li class="experience">Base Exp.: ${pokemon.base_experience}</li>
               <li class="height">Height: ${pokemon.height}</li>
               <li class="weight">Weight: ${pokemon.weight}</li>
            </ol>
            <ol class="skills">
                <span class="name">Skills</span>
                ${pokemon.skills.map((skill) => `<li class="skill ${skill}">${skill}</li>`).join('')}
            </ol>
        </div>
    </li>
    `
}
//Convertendo a lista de Pokemon em html
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLiDetail).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)
// Criando botão para carregar mais Pokemons
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
// Criando Botão para mostrar a descrição dos pokemons
loadDetailsButton.addEventListener('click', () => {
    
    for (let i=0; i<moreDetailClass.length; i+=1){
        let display = moreDetailClass[i].style.display

        if(display == "none"){
            moreDetailClass[i].style.display = 'flex'
        }
        else{
            moreDetailClass[i].style.display = 'none'
        }
    }
})