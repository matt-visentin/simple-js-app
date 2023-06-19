let pokemonRepository = ( function(){
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === "object" &&
            "name" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList
    }

    function showDetails (pokemon) {
        console.log('Name: ' + pokemon.name + '; ID: ' + pokemon.id + '; Height: ' + pokemon.height + '; Types: ' + pokemon.types);
    }
    
    function addEvent(button, pokemon){
        button.addEventListener('click', function (){
          showDetails(pokemon)});
      }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        pokemonRepository.addEvent(button, pokemon);
    }

    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
            let pokemon = {
                name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                height: item.height,
                types: item.types,
                weight: item.weight,
                detailsUrl: item.url,
            };
            add(pokemon);
            // console.log(pokemon);
            });
        }).catch(function(e) {
        console.error(e);
        })
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
          pokemon.name = details.name;
          pokemon.id = details.id;
          pokemon.height = details.height;
          pokemon.types = details.types;
          pokemon.sprite = details.sprites.front_default;
          pokemon.sprite2 = details.sprites.back_default;
          pokemon.weight = details.weight;
        }).catch(function(e) {
        console.error(e);
        });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        addEvent: addEvent,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();

// Writes on DOM a list of Pokémon
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});