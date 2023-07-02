let pokemonRepository = ( function(){
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Add Pokémon to the list 
  function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
  }

  function getAll() {
      return pokemonList
  }
  
  // Add event on button to call Pokémon's detials modal 
  function addEvent(button, pokemon){
      button.addEventListener('click', function (){
        showDetails(pokemon)});
    }
  
  // Add a list element for each Pokémon
  function addListItem(pokemon) {
      let searchInput = document.getElementById("searchInput").value.toLowerCase();
      let pokemonName = pokemon.name.toLowerCase();
  
      if (pokemonName.includes(searchInput)) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button", "btn", "btn-outline-success");
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#modal-container");
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        pokemonRepository.addEvent(button, pokemon);
      }
    }

  // Fetches Pokémon from API library
  function loadList() {
      return fetch(apiUrl).then(function(response) {
          return response.json();
      }).then(function(json) {
          json.results.forEach(function(item) {
          let pokemon = {
              name: item.name,
              height: item.height,
              types: item.types,
              weight: item.weight,
              detailsUrl: item.url,
          };
          add(pokemon);
        });
      }).catch(function(e) {
      console.error(e);
      })
  }

  // Fetches Pokémon details
  function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(function(response) {
          return response.json();
      }).then(function(details) {
        pokemon.name = details.name;
        pokemon.id = details.id;
        pokemon.height = details.height;
        pokemon.types = details.types;
        pokemon.imageFront = details.sprites.front_default;
        pokemon.imageBack = details.sprites.back_default;
        pokemon.weight = details.weight;
      }).catch(function(e) {
      console.error(e);
      });
  }

  // Add modal with selcted Pokémon's details
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
        let titleNameElement = document.querySelector(".modal-title");
        titleNameElement.innerText = pokemon.name;
        let contentImageElement = document.querySelector(".pokemon-image");
        contentImageElement.src = pokemon.imageFront
        let contentHeightElement = document.querySelector(".pokemon-height");
        contentHeightElement.innerText = `Height: ${pokemon.height}`;
        let contentIdElement = document.querySelector(".pokemon-id");
        contentIdElement.innerText = `ID: ${pokemon.id}`;
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

// Add event listener to search input
let searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
  // Clear the existing list
  let pokemonList = document.querySelector(".pokemon-list");
  pokemonList.innerHTML = "";

  // Filter and display Pokémon based on search letter
  let searchLetter = searchInput.value.toLowerCase();
  pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonName = pokemon.name.toLowerCase();
    if (pokemonName.includes(searchLetter)) {
      pokemonRepository.addListItem(pokemon);
    }
  });
});