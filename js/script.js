var amount = document.getElementById('amount');

amount.addEventListener('keyup', () => {
    getPokemons(amount.value);
});

amount.addEventListener('change', () => {
    getPokemons(amount.value);
});

function getPokemons(amount) {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=' + amount).then(response => response.json()).then(allpokemon => {
    
        var pokemons = [];

        allpokemon.results.map((val) => {

            fetch(val.url).then(response => response.json()).then(pokemonSingle => {

                console.log(pokemonSingle);

                pokemons.push({
                    name: val.name,
                    image: pokemonSingle.sprites.front_default,
                    specie: pokemonSingle.species.name,
                    weight: pokemonSingle.weight
                });

                if (pokemons.length == amount) {

                    var pokemon_boxes = document.querySelector('.pokemon-boxes');

                    pokemon_boxes.innerHTML = "";

                    pokemons.map(function(val) {
                        pokemon_boxes.innerHTML += `
                        <div class="pokemon-box">
                            <img src="`+val.image+`" />
                            <p>Name: `+val.name+`</p>
                            <p>Specie: `+val.specie+`</p>
                            <p>Weight: `+val.weight+`</p>
                        </div><!--pokemon-box-->`;
                    });
                }
            });
        });
    });
}