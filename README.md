# Pokémon Browser 🌍🔍

A simple web application to browse and view statistics of Pokémon.

## Features 🌟

- **Pokémon Listing**: 📜 Displays a list of Pokémon sourced from the PokeAPI.
- **Pokémon Search**: 🔍 Easily search and filter the list of Pokémon using a search bar.
- **Pokémon Statistics**: 📊 Click on a Pokémon from the list to view its detailed statistics.

## Usage 🖱️

1. **Homepage**: The main page (`index.html`) showcases a list of Pokémon. You can scroll through the list to find a Pokémon or use the search bar to narrow down your choices.
    - **Search**: 📝 Type in the search bar (`pokemonSearch`) to dynamically filter the Pokémon list.
    - **Select**: 🖱️ Click on a Pokémon name to view its statistics. This will redirect you to the stats page (`stats.html`).

2. **Stats Page**: The stats page (`stats.html`) displays detailed statistics of the selected Pokémon.
    - **Go Back**: ⬅️ Click on the "Go Back" button (`goBack`) to return to the main list.

## Technical Details 🔧

- The app initially fetches 200 Pokémon from the [PokeAPI](https://pokeapi.co/).
- The Pokémon data is stored in the `allPokemon` array for easy filtering and rendering.
- Individual Pokémon statistics are fetched and displayed dynamically based on user interactions.

## How to Run 🚀

1. Clone the repository or download the code.
2. Open `index.html` in a browser.
3. Interact with the application as described in the usage section.

## Dependencies 📦

- The app relies on the [PokeAPI](https://pokeapi.co/) for fetching Pokémon data.

## Future Enhancements 💡

- Add pagination to display more Pokémon.
- Display more images and details in the Pokémon statistics page.
- Improve the styling for better user experience.
