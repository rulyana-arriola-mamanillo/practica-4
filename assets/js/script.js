async function loadPokemon() {
    const container = document.getElementById("pokemonList");
    
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

            let card = document.createElement("div");
            card.style.background = "white";
            card.style.borderRadius = "12px";
            card.style.overflow = "hidden";
            card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";

            let imgContainer = document.createElement("div");
            imgContainer.style.background = "white";
            imgContainer.style.padding = "20px";

            let img = document.createElement("img");
            img.src = detail.sprites.other['official-artwork'].front_default;
            img.alt = detail.name;
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.display = "block";

            let footer = document.createElement("div");
            footer.style.background = "#1e2a47";
            footer.style.padding = "15px";
            footer.style.textAlign = "center";
            footer.style.color = "white";

            let name = document.createElement("p");
            name.textContent = detail.name.charAt(0).toUpperCase() + detail.name.slice(1);
            name.style.margin = "0";
            name.style.fontWeight = "bold";
            name.style.fontSize = "22px";
            name.style.textShadow = "1px 1px 2px rgba(0,0,0,0.5)";
            name.style.cursor = "pointer"; // Para que se vea clickeable

            // Contenedor de datos oculto al inicio
            let info = document.createElement("div");
            info.style.display = "none"; // OCULTO
            info.style.marginTop = "10px";
            info.innerHTML = `
                <p style="margin: 4px 0; font-size: 16px;">Altura: ${detail.height / 10} m</p>
                <p style="margin: 4px 0; font-size: 16px;">Peso: ${detail.weight / 10} kg</p>
                <p style="margin: 4px 0; font-size: 16px; text-transform: capitalize;">Tipo: ${detail.types[0].type.name}</p>
            `;

            // Cuando haces click en el nombre, muestra/oculta los datos
            name.onclick = () => {
                info.style.display = info.style.display === "none" ? "block" : "none";
            };

            footer.appendChild(name);
            footer.appendChild(info);

            imgContainer.appendChild(img);
            card.appendChild(imgContainer);
            card.appendChild(footer);
            container.appendChild(card);
        }
    } catch (error) {
        container.innerHTML = "<p>Error cargando Pokémon</p>";
    }
}

loadPokemon();