// Array to store all fetched Pokémon data.
let allPokemon = []

// Event listener for when the document is fully loaded.
document.addEventListener('DOMContentLoaded', function () {
    // Check if the current page is 'index.html' or the root directory.
    if (
        window.location.pathname.includes('index.html')
    ) {
        // Fetch the list of Pokémon.
        fetchPokemonList()

        // Add event listener to the search input to filter Pokémon list based on user input.
        document
            .getElementById('pokemonSearch')
            .addEventListener('input', function () {
                const searchTerm = this.value.trim().toLowerCase()
                filterPokemonList(searchTerm)
            })

        // Check if the current page is 'stats.html'.
    } else if (window.location.pathname.includes('stats.html')) {
        // Display stats for the selected Pokémon.
        displayPokemonStats()

        // Add event listener for the "Go Back" button to redirect back to the main list.
        document
            .getElementById('goBack')
            .addEventListener('click', function () {
                window.location.href = 'index.html'
            })
    }
})

// Function to fetch Pokémon list from the API.
function fetchPokemonList() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
        .then((response) => response.json())
        .then((data) => {
            // Store the results in the allPokemon array.
            allPokemon = data.results

            // Render the Pokémon list on the page.
            renderPokemonList(allPokemon)
        })
}

// Function to render the Pokémon list on the page.
function renderPokemonList(pokemonList) {
    const pokemonListEl = document.getElementById('pokemonList')

    // Clear current list.
    pokemonListEl.innerHTML = ''

    // Loop through the list of Pokémon and create a card for each.
    pokemonList.forEach((pokemon) => {
        const pokemonCard = document.createElement('div')
        pokemonCard.className = 'pokemon-card'
        pokemonCard.innerHTML = pokemon.name

        // Add event listener to each card to redirect to stats page when clicked.
        pokemonCard.addEventListener('click', () => {
            localStorage.setItem('selectedPokemonUrl', pokemon.url)
            window.location.href = 'stats.html'
        })

        // Append the card to the list.
        pokemonListEl.appendChild(pokemonCard)
    })
}

// Function to filter the Pokémon list based on a search term.
function filterPokemonList(searchTerm) {
    const filteredPokemon = allPokemon.filter((pokemon) =>
        pokemon.name.includes(searchTerm)
    )

    // Render the filtered list.
    renderPokemonList(filteredPokemon)
}

// Function to display detailed statistics for a selected Pokémon.
function displayPokemonStats() {
    const url = localStorage.getItem('selectedPokemonUrl')

    if (url) {
        fetch(url)
            .then((response) => response.json())
            .then((pokemon) => {
                document.getElementById('pokemonName').innerText = pokemon.name
                const pokemonImageEl = document.getElementById('pokemonImage')

                // Set the default sprite initially.
                pokemonImageEl.src = pokemon.sprites.front_default

                // Dropdown to select between regular and shiny sprites.
                const spriteSelector = document.getElementById('spriteSelector')

                // Handle the change event of the dropdown.
                spriteSelector.addEventListener('change', (event) => {
                    if (event.target.value === 'shiny') {
                        pokemonImageEl.src = pokemon.sprites.front_shiny
                    } else {
                        pokemonImageEl.src = pokemon.sprites.front_default
                    }
                })

                // Display the stats.
                const statsEl = document.getElementById('pokemonStats')
                pokemon.stats.forEach((stat) => {
                    const li = document.createElement('li')
                    li.innerText = `${stat.stat.name}: ${stat.base_stat}`
                    statsEl.appendChild(li)
                })
            })
    }
}
