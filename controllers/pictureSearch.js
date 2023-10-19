const axios = require('axios');

async function searchImages(keyword1, keyword2, keyword3) {
    try {
        const response = await axios.get('https://stock.adobe.io/Rest/Media/1/search/images', {
            params: {
                // Alustavat parametrit, muokkaa kun tietää lisää
                'search_parameters[words]': `${keyword1},${keyword2},${keyword3}`,
                'search_parameters[limit]': 10,
            },
            headers: {
                //Firman adobe tilin tiedot
                'x-api-key': 'YOUR_API_KEY',
                'X-Product': 'YOUR_PRODUCT',
            },
        });

        const searchResults = response.data.images;
        const searchUrl = `https://stock.adobe.com/search?stickers=false&words=${keyword1}%2C${keyword2}%2C${keyword3}`;

        console.log(`Search results for "${keyword1},${keyword2},${keyword3}": ${searchUrl}`);

        searchResults.forEach((result, index) => {
            console.log(`Result ${index + 1}: ${result.display_name}`);
        });

        // Avaa ikkunan
        window.location.href = searchUrl;
    } catch (error) {
        console.error(`Error searching images: ${error.message}`);
    }
}

searchImages('nature', 'landscape', 'wildlife');