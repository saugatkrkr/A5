// function to fetch 
async function updateHitCount(pageID) {
    try {
      const response = await fetch(`/hits/${pageID}`);
      const data = await response.json();
      document.getElementById('hitCount').textContent = data.hits;
    } catch (error) {
      console.error('Error fetching hit count:', error);
      document.getElementById('hitCount').textContent = 'Error';
    }
  }