const pokemonol = document.getElementById('PokemonsList')
const loadMoreButton = document.getElementById('LoadMore')
const Content = document.getElementById('conteúdo')
const Corpo = document.getElementById('Corpo')
const maxPoke = 151
let limit = 6
let offset = 0
let NroPoke = 0



function loadPokemonItems(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemonlist = []) => {
        const NewHTML = pokemonlist.map((pokemon) => 
        `<button class="StatsBT" onClick="Status(this.value);" value="${pokemon.number}"> 
        <li class="Pokemon ${pokemon.type}">
            <span class="Number">#${pokemon.number}</span>
            <span class="Name">${pokemon.name}</span>
               <div class="Detail">
                    <ol class="Types">
                        ${pokemon.types.map((type) => `<li class="Type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.number}.png  " 
                    alt="${pokemon.name}">
                </div>
        </li>
        </button>`).join('')
        pokemonol.innerHTML += NewHTML
})}

onload = loadPokemonItems(offset, limit)

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

function Status(NroPoke, limit){
    Content.parentNode.removeChild(Content)
    NroPoke = NroPoke - 1;
    limit = 1;


    pokeapi.getPokemons(NroPoke, limit).then((pokemonlist = []) => {
        const NewHTML = pokemonlist.map((pokemon) => 
        `
        <section class="content ${pokemon.type}">
            <div class="IMG ${pokemon.type}">
                
                <img class="gif" src="https://github.com/wellrccity/pokedex-html-js/blob/master/assets/img/pokemons/poke_${pokemon.number}.gif?raw=true" alt="bulbasaur">
                <h1 class="name">
                    ${pokemon.name}
                  
                </h1>
                <span class="nro">
                #${pokemon.number}
                </span>
                <h2 class= "Tipos">
                ${pokemon.types.map((type) => `<li class="Type ${type}">${type}</li>`).join('')}
                </h2>
                </div>
    
            <div class="Status">
            <span>
                Características
                
            </span>
            <p>
                Vida ${pokemon.hp}
            </p>
            <p>
                Ataque ${pokemon.attack}
            </p>
            <p>
                Defesa ${pokemon.defense}
            </p>
            <p>
                Ataque especial ${pokemon.specialAttack}
            </p>
            <p>
                Defesa especial ${pokemon.specialDefense}
            </p>
            <p>
                Velocidade ${pokemon.speed}
            </p>

        </div>
    
    
    
    
    
        </section>`).join('')
       Corpo.innerHTML += NewHTML
       console.log (pokemonlist)
})

}




