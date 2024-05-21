const urls = [
    "https://i.pinimg.com/originals/1e/31/51/1e31515208a1772c6cfea85d1071474e.jpg",
    "https://www.etsy.com/listing/1199240838/colorful-crochet-necktie-retro-knit-tie?gpla=1&gao=1&&utm_source=google&utm_medium=cpc&utm_campaign=shopping_us_a-accessories-suit_and_tie_accessories-neckties&utm_custom1=_k_EAIaIQobChMIloG7qMOdhgMVc0f_AR0h4A5jEAQYAyABEgKorfD_BwE_k_&utm_content=go_12573072685_122305127929_507558052015_pla-355209283428_c__1199240838_556277119&utm_custom2=12573072685&gad_source=1&gclid=EAIaIQobChMIloG7qMOdhgMVc0f_AR0h4A5jEAQYAyABEgKorfD_BwE",
   "https://fivevoltlogic.biz/products/functional-light-up-mini-tiffany-lamp-earrings-stained-glass-lamp-earrings-working-lamp-earrings-replica-tiffany-lamp-moth-meme",
    "https://farmrio.com/products/beige-rose-shaped-bodice-sleeveless-maxi-dress?variant=41537224245341",
    "https://www.dollskill.com/products/its-always-greener-platform-sandals?epik=dj0yJnU9eXZhaFprbnhSUW5vYW56b004NjlmZlpvNVM1SW5Id0EmcD0wJm49STVoajMzc2tjbFJGN2NpbEo4bHFTZyZ0PUFBQUFBR1pMOEtv",
    "https://sockseason.com/products/la-fleur-sheer-floral-jacquard-mesh-crew-sock-irises",
    "https://ph5.com/collections/dresses/products/mia-signature-wavy-plaid-dress-in-eco-yarn-2?variant=40880400072873",
    "https://sockcandy.com/products/y2k-hearts-ruffle-sheer-crew-sock?epik=dj0yJnU9MVV6cXVFVWR0Z1dCMzR4ZF95c242S1NlbVZnTVgzWU0mcD0wJm49ak1iM1pzTzMzTEYzVjFfOGNRN0N4USZ0PUFBQUFBR1pMOGRj",
    "https://orchardmile.com/sock-candy/heart-floral-sheer-crew-sock-jfbcce75fa9",
    
    
    // Add more new URLs as needed
];

document.getElementById('generateButton').addEventListener('click', async () => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];
    const urlDisplay = document.getElementById('urlDisplay');
    urlDisplay.innerText = randomUrl;
    urlDisplay.href = randomUrl;  // Make the URL a clickable link

    try {
        const imageUrl = await fetchImageUrl(randomUrl);
        const imageDisplay = document.getElementById('imageDisplay');

        if (imageUrl) {
            imageDisplay.src = imageUrl;
            imageDisplay.style.display = 'block';
        } else {
            imageDisplay.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
});

async function fetchImageUrl(url) {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        const html = data.contents;

        // Create a DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        console.log(html); // Log the HTML content

        let imageUrl = null;

        // 1. Look for the og:image meta tag
        let metaTag = doc.querySelector('meta[property="og:image"]');
        console.log('Meta tag found:', metaTag);
        if (metaTag) {
            imageUrl = metaTag.getAttribute('content');
        }

        // 2. Look for a specific img tag
        if (!imageUrl) {
            let imgTag = doc.querySelector('img.some-specific-class'); // Replace with actual class or id
            console.log('Image tag found:', imgTag);
            if (imgTag) {
                imageUrl = imgTag.src;
            }
        }

        // 3. Add more parsing logic as needed based on the HTML structure

        return imageUrl;
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}
