const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    //Inserindo Descrição do Pokemon
    pokemon.base_experience = pokeDetail.base_experience

    pokemon.height = pokeDetail.height

    pokemon.weight = pokeDetail.weight

    const skills = pokeDetail.abilities.map((abilities) => abilities.ability.name)
    pokemon.skills = skills

    const moves = pokeDetail.moves.map((moves) => moves.move.name)
    pokemon.moves = moves

    return pokemon
}
//Colocando os detalhes do Pokemon (name,number,type)
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}    

//Colocando descrição do Pokemon (experience,height,weigth,skills,moves)
pokeApi.getPokemon = (pokeID) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

//Lista de Pokemon a ser mostrado na página buscando na API
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}