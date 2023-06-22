let pokemonRepository = ( function(){
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    
    // Add event on button to call Pokémon's detials modal 
    function addEvent(button, pokemon){
        button.addEventListener('click', function (){
          showDetails(pokemon)});
      }
    
    // Add a list element for each Pokémon
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
            // console.log(pokemon);
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
            let modalContainer = document.querySelector("#modal-container");
    
            modalContainer.innerHTML = "";   // Clear all existing modal content
            
            let modal = document.createElement('div');
            modal.classList.add('modal');
        
            // Add the new modal content
            let closeButtonElement = document.createElement("button");
            closeButtonElement.classList.add("modal-close");
            closeButtonElement.innerText = "Close"
            closeButtonElement.addEventListener("click", hideModal);
        
            let titleElement = document.createElement("h1");
            titleElement.innerText = pokemon.name;

            let contentHeightElement = document.createElement("p");
            contentHeightElement.innerText = `Height: ${pokemon.height}`;

            let contentIdElement = document.createElement("p");
            contentIdElement.innerText = `ID: ${pokemon.id}`;

            let contentImageElement = document.createElement("img");
            contentImageElement.src = pokemon.imageFront;
            
            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentHeightElement);
            modal.appendChild(contentIdElement);
            modal.appendChild(contentImageElement);
            modal.appendChild(contentImageElement);
            modalContainer.appendChild(modal);
        
            modalContainer.classList.add("is-visible");
        
            modalContainer.addEventListener("click", (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            })
        
            function hideModal() {
                let modalContainer = document.querySelector("#modal-container");
                modalContainer.classList.remove("is-visible");
            }
            
            window.addEventListener("keydown", (e) => {
                let modalContainer = document.querySelector("#modal-container");
                if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                    hideModal();
                }
            });
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