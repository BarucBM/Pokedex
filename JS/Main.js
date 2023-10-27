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

        const NewHTML = pokemonlist.map(function(pokemon) { 
            var root = document.documentElement;
            root.style.setProperty('--Valor-vida', pokemon.hp),
            root.style.setProperty('--Valor-ataque', pokemon.attack), 
            root.style.setProperty('--Valor-defesa', pokemon.defense), 
            root.style.setProperty('--Valor-ataquesp', pokemon.specialAttack), 
            root.style.setProperty('--Valor-defesasp', pokemon.specialDefense),
            root.style.setProperty('--Valor-velocidade', pokemon.speed),
            console.log(pokemon.hp)


            return((`        
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
            <div class="Info">
                <span>
                    Características
                    
                </span>

                <p>
                    Vida
                </p>
                <p>
                    Ataque
                </p>
                <p>
                    Defesa
                </p>
                <p>
                    Ataque especial
                </p>
                <p>
                    Defesa especial
                </p>
                <p>
                    Velocidade
                </p>
                </div>


        <div class="Valores">
                <br>
                <br>
                
            <div class="one">  
                <p>
                    ${pokemon.hp}<div class="progress" ><div class="vida"></div></div>
                </p>
            </div>
            <div class="one">  
                <p>
                    ${pokemon.attack}<div class="progress" ><div class="ataque"></div></div>
                </p>
            </div>
            <div class="one">  
                <p>
                    ${pokemon.defense}<div class="progress" ><div class="defesa"></div></div>
                </p>
            </div>
            <div class="one">  
                <p>
                    ${pokemon.specialAttack}<div class="progress" ><div class="ataquesp"></div></div>
                </p>
            </div>
            <div class="one">  
                <p>
                    ${pokemon.specialDefense}<div class="progress" ><div class="defesasp"></div></div>
                </p>
            </div>
            <div class="one">  
                <p>
                    ${pokemon.speed}<div class="progress" ><div class="velocidade"></div></div>
                </p>
            </div>

        </div>
        </div>

    
    
    
        </section>`

        ))}

 
        )
        Corpo.innerHTML += NewHTML.join('')
    })
    
}




