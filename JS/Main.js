const pokemonol = document.getElementById('PokemonsList')
const loadMoreButton = document.getElementById('LoadMore')
const maxPoke = 151
const limit = 6
let offset = 0


function loadPokemonItems(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemonlist = []) => {
        const NewHTML = pokemonlist.map((pokemon) => 
        `<li class="Pokemon ${pokemon.type}">
                    <span class="Number">#0${pokemon.number}</span>
                    <span class="Name">${pokemon.name}</span>
                    <div class="Detail">
                        <ol class="Types">
                            ${pokemon.types.map((type) => `<li class="Type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png  " 
                        alt="${pokemon.name}">
                    </div>
                </li>`).join('')
        pokemonol.innerHTML += NewHTML

    })  
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qntPoke = offset+limit

    if (qntPoke >= maxPoke){
        const limit = maxPoke - offset
        loadPokemonItems(offset, limit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItems(offset, limit)

    }

    

})


                        


