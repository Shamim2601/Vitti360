let currentIndex = 0;
const cards = document.querySelectorAll('.q-card');

function showCard(index) {
  cards[currentIndex].classList.remove('active');
  currentIndex = index;
  cards[currentIndex].classList.add('active');
  updateButtons();
}

function showNext() {
  if (currentIndex < cards.length - 1) {
    showCard(currentIndex + 1);
  }
}

function showPrev() {
  if (currentIndex > 0) {
    showCard(currentIndex - 1);
  }
}

function showShareLink(questionId) {
  // Construct the shareable link
  const baseURL = 'https://vitti360.xyz/jiggasa/';
  const shareableLink = `${baseURL}${questionId}`;
  
  // Copy the link to the clipboard
  navigator.clipboard.writeText(shareableLink)
    .then(() => {
      alert('Link copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
  
  // Prevent default link behavior
  return false;
}

function updateButtons() {
  document.getElementById('prevBtn').disabled = currentIndex === 0;
  document.getElementById('nextBtn').disabled = currentIndex === cards.length - 1;
}

updateButtons();
