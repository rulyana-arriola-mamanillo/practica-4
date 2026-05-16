async function loadPokemon() {
    const container = document.getElementById("pokemonList");
    
    // Estilo del contenedor: 1 columna
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr";
    container.style.gap = "15px";
    container.style.maxWidth = "350px";
    container.style.margin = "20px auto";
    container.style.padding = "0 10px";

    try {
        let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6");
        let data = await res.json();

        for (let pokemon of data.results) {
            let resDetail = await fetch(pokemon.url);
            let detail = await resDetail.json();

            // Card completa
            let card = document.createElement("div");
            card.style.background = "white";
            card.style.borderRadius = "12px";
            card.style.overflow = "hidden";
            card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";

            // Imagen con fondo blanco
            let imgContainer = document.createElement("div");
            imgContainer.style.background = "white";
            imgContainer.style.padding = "20px";

            let img = document.createElement("img");
            img.src = detail.sprites.other['official-artwork'].front_default;
            img.alt = detail.name;
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.display = "block";

            // Franja azul oscura de abajo
            let footer = document.createElement("div");
            footer.style.background = "#1e2a47";
            footer.style.padding = "15px";
            footer.style.textAlign = "center";

            let name = document.createElement("p");
            name.textContent = detail.name.charAt(0).toUpperCase() + detail.name.slice(1);
            name.style.margin = "0";
            name.style.fontWeight = "bold";
            name.style.fontSize = "22px";
            name.style.color = "white";
            name.style.textShadow = "1px 1px 2px rgba(0,0,0,0.5)";

            // Armar la card
            imgContainer.appendChild(img);
            footer.appendChild(name);
            card.appendChild(imgContainer);
            card.appendChild(footer);
            container.appendChild(card);
        }
    } catch (error) {
        container.innerHTML = "<p>Error cargando Pokémon</p>";
    }
}

loadPokemon();