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
    return {
        add: add,
        getAll: getAll
    }
})();

console.log(pokemonRepository.getAll())

// Writes on DOM all Pokemon's names and their hieght and highlights those bigger then 100cm
pokemonRepository.getAll().forEach((pokemon) => {
    if (pokemon.height > 99) {
        document.write('<li>' + pokemon.name + ' (height: ' + pokemon.height + ' cm) - <b>Wow! That is big!</b></li>');
    } else {
        document.write('<li>' + pokemon.name + ' (height: ' + pokemon.height + ' cm)</li>');
    }
});
