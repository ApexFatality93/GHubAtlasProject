function init(csvFile) {    
    fetch(csvFile)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const csvCards = document.getElementById('csvCards');

            function updateCards() {
                const builderFilter = document.getElementById('builderFilter').value.toLowerCase();
                const baseNameFilter = document.getElementById('baseNameFilter').value.toLowerCase();
                const regionFilter = document.getElementById('regionFilter').value.toLowerCase();
                const tagFilter = document.getElementById('tagFilter').value.toLowerCase();
                const numericalFilter = parseFloat(document.getElementById('numericalFilter').value);
                const platformFilter = document.getElementById('platformFilter').value.toLowerCase();
                const gameModeFilter = document.getElementById('gameModeFilter').value.toLowerCase();
                const dateFilter = document.getElementById('dateFilter').value.toLowerCase();

                csvCards.innerHTML = ''; // Clear the card container

                lines.forEach(line => {
                    const cells = line.split(',');
                    const builder = cells[3].toLowerCase();
                    const baseName = cells[2].toLowerCase();
                    const region = cells[0].toLowerCase();
                    const tag = cells[0].toLowerCase();
                    const baseParts = parseFloat(cells[6]);
                    const platform = cells[4].toLowerCase();
                    const gameMode = cells[5].toLowerCase();
                    const date = cells[7].toLowerCase();

                    if (
                        builder.includes(builderFilter) &&
                        baseName.includes(baseNameFilter) &&
                        region.includes(regionFilter) &&
                        (isNaN(numericalFilter) || baseParts >= numericalFilter) && 
                        tag.includes(tagFilter) &&
                        platform.includes(platformFilter) &&
                        gameMode.includes(gameModeFilter) &&
                        date.includes(dateFilter)
                    ) {
                        const card = document.createElement('div');
                        card.classList.add('card');

                        // Create card content
                        const cardContent = `
                            <h2>${cells[2]}</h2>
                            <p>HUB Tag: ${cells[0]}</p>
                            <p>Builder: ${cells[3]}</p>
                            <p>Built-on: ${cells[4]}</p>
                            <p>Built-in: ${cells[5]} mode</p>
                            <p>Base pieces: ${cells[6]}</p>
                            <p>Upload date: ${cells[7]}</p>
                            <p><span class="glyph-font">${cells[1]}</p>
                        `;

                        card.innerHTML = cardContent;
                        csvCards.appendChild(card); // Append card to the container
                    }
                    // Clear the card container if no filters 
                    if (
                        builderFilter == "" &&
                        baseNameFilter == "" &&
                        regionFilter == "" &&
                        numericalFilter == "0" && 
                        tagFilter == "" &&
                        platformFilter == "" &&
                        gameModeFilter == "" &&
                        dateFilter == ""
                        
                    ) {
                        csvCards.innerHTML = '';
                    }

                });
            }

            // Add input event listeners to trigger filtering
            document.getElementById('builderFilter').addEventListener('input', updateCards);
            document.getElementById('baseNameFilter').addEventListener('input', updateCards);
            document.getElementById('regionFilter').addEventListener('change', updateCards);
            document.getElementById('tagFilter').addEventListener('input', updateCards);
            document.getElementById('platformFilter').addEventListener('change', updateCards);
            document.getElementById('gameModeFilter').addEventListener('change', updateCards);
            document.getElementById('numericalFilter').addEventListener('change', updateCards); 
            document.getElementById('dateFilter').addEventListener('change', updateCards);

        })
        .catch(error => console.error('Error:', error));
};
