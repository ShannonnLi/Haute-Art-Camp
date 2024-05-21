const urls = [
"https://www.pinterest.com/login/",
  "https://msu.edu/",
    // Add more URLs as needed
];

document.getElementById('generateButton').addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * urls.length);
    const randomUrl = urls[randomIndex];
    document.getElementById('urlDisplay').innerText = randomUrl;
});
