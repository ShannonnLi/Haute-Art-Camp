const urls = [
    "https://i.pinimg.com/originals/1e/31/51/1e31515208a1772c6cfea85d1071474e.jpg",
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
