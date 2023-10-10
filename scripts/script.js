let allPokemon = [] // Store all fetched Pokémon

document.addEventListener('DOMContentLoaded', function () {
    if (
        window.location.pathname.includes('index.html') ||
        window.location.pathname === '/'
    ) {
        fetchPokemonList()

        // Filter on input change
        document
            .getElementById('pokemonSearch')
            .addEventListener('input', function () {
                const searchTerm = this.value.trim().toLowerCase()
                filterPokemonList(searchTerm)
            })
    } else if (window.location.pathname.includes('stats.html')) {
        displayPokemonStats()

        // Event listener for the "Go Back" button
        document
            .getElementById('goBack')
            .addEventListener('click', function () {
                window.location.href = 'index.html'
            })
    }
})

function fetchPokemonList() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
        .then((response) => response.json())
        .then((data) => {
            allPokemon = data.results // Store the results in the allPokemon array
            renderPokemonList(allPokemon) // Render the Pokémon list
        })
}

function renderPokemonList(pokemonList) {
    const pokemonListEl = document.getElementById('pokemonList')
    pokemonListEl.innerHTML = '' // Clear current list
    pokemonList.forEach((pokemon) => {
        const pokemonCard = document.createElement('div')
        pokemonCard.className = 'pokemon-card'
        pokemonCard.innerHTML = pokemon.name
        pokemonCard.addEventListener('click', () => {
            localStorage.setItem('selectedPokemonUrl', pokemon.url)
            window.location.href = 'stats.html'
        })
        pokemonListEl.appendChild(pokemonCard)
    })
}

function filterPokemonList(searchTerm) {
    const filteredPokemon = allPokemon.filter((pokemon) =>
        pokemon.name.includes(searchTerm)
    )
    renderPokemonList(filteredPokemon)
}

function displayPokemonStats() {
    const url = localStorage.getItem('selectedPokemonUrl')
    if (url) {
        fetch(url)
            .then((response) => response.json())
            .then((pokemon) => {
                document.getElementById('pokemonName').innerText = pokemon.name
                document.getElementById('pokemonImage').src =
                    pokemon.sprites.front_default
                const statsEl = document.getElementById('pokemonStats')
                pokemon.stats.forEach((stat) => {
                    const li = document.createElement('li')
                    li.innerText = `${stat.stat.name}: ${stat.base_stat}`
                    statsEl.appendChild(li)
                })
            })
    }
}
