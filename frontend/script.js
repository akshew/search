document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const loader = document.getElementById('loading');
  const searchResults = document.getElementById('results');
  const descriptionText = document.getElementById('description-text');

  async function performSearch(searchTerm) {
    loader.style.display = 'block';
    searchResults.style.display = 'none';

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();

      loader.style.display = 'none';

      if (data.geminiResponse || data.gptResponse) {
        descriptionText.innerHTML = `
          <p>${data.geminiResponse || 'No response from Api'}</p>
        `;
      } else {
        descriptionText.innerText = `No results for "${searchTerm}"`;
      }

      searchResults.style.display = 'block'; 
    } catch (error) {
      console.error('Error:', error);
      loader.style.display = 'none';
      descriptionText.innerText = `Error fetching results for "${searchTerm}"`;
      searchResults.style.display = 'block';
    }
  }

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      searchButton.click(); 
    }
  });

  searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      performSearch(searchTerm); 
    }
  });
});
