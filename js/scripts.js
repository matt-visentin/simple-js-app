let pokemonRepository = ( function(){
    let pokemonList = [ // Pokemons database for pokedex
        {
            name: 'Bulbasaur',
            id: 1,
            types: ['grass', 'poison'],
            height: 70,
        },
        {
            name: 'Charmander',
            id: 4,
            types: ['fier'],
            height: 60,
        },
        {
            name: 'Squirtle',
            id: 7,
            types: ['water'],
            height: 50,
        },
        {
            name: 'Caterpie',
            id: 10,
            types: ['bug'],
            height: 30,
        },
        {
            name: 'Weedle',
            id: 13,
            types: ['bug', 'poison'],
            height: 30,
        },
        {
            name: 'Pidgey',
            id: 16,
            types: ['flying', 'normal'],
            height: 30,
        },
        {
            name: 'Rattata',
            id: 19,
            types: ['normal'],
            height: 30,
        },
        {
            name: 'Spearow',
            id: 21,
            types: ['flying', 'normal'],
            height: 30,
        },
        {
            name: 'Ekans',
            id: 23,
            types: ['poison'],
            height: 200,
        },
        {
            name: 'Pikachu',
            id: 25,
            types: ['electric'],
            height: 40,
        },
        {
            name: 'Sandshrew',
            id: 27,
            types: ['ground'],
            height: 60,
        },
        {
            name: 'Nidoran',
            id: 29,
            types: ['poison'],
            height: 40,
        }
    ];
    function add(pokemon){
        if (typeof pokemon === typeof 'object'){
            if (Object.keys(pokemonList[0]).every((key) => key in pokemon)) {
                alert(
                  `You have discovered a new Pokémon! "${pokemon.name}" data has been entered into the Pokédex.`
                );
                pokemonList.push(pokemon);
              } else {
                alert(
                  `The data for the new Pokémon you are trying to add is not complete. Please verify that no fields are missing.`
                );
              }
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

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        addEvent: addEvent
    }
})();

// Writes on DOM a list of Pokémon
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
