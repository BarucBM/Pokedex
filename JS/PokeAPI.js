const pokeapi = {}

function convertpokeapiToPokemon (pokeDetail) {
    const pokemon = new Pokemon()

    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type1] = types
    pokemon.types = types
    pokemon.type = type1

    const Stats = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat)
    pokemon.hp = Stats[0]
    pokemon.attack = Stats[1]
    pokemon.defense = Stats[2]
    pokemon.specialAttack = Stats[3]
    pokemon.specialDefense = Stats[4]
    pokemon.speed = Stats[5]

    


    return pokemon

}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response)=> response.json())
            .then(convertpokeapiToPokemon)

}

pokeapi.getPokemons = ( offset = 0, limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
            //Converte o resnponse em uma promise do body convertido em json
            .then((response) => response.json())
            //Recebe o body convertido em json
            .then((jsonbody) => jsonbody.results)
            .then((pokemons) => pokemons.map((pokeapi.getPokemonDetail)))
            .then((detailRequest) => Promise.all(detailRequest))
            .then((PokemonDetails) => PokemonDetails)
}
