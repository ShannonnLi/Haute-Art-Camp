const urls = [
"https://warsawdog.com/en/Basenji-companion-of-the-pharaohs-with-African-roots/",
    // Add more new URLs as needed
];

document.getElementById('generateButton').addEventListener('click', async () => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];
    document.getElementById('urlDisplay').innerText = randomUrl;

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
    // Using a proxy to bypass CORS restrictions for this example
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    const html = data.contents;

    // Parsing the image URL from the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const metaTag = doc.querySelector('meta[property="og:image"]');
    
    if (metaTag) {
        return metaTag.getAttribute('content');
    } else {
        // Fallback or additional parsing logic
        return null;
    }
}
