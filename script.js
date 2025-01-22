// Play SIUUU sound on Buy Now click
const buyNowButton = document.getElementById('buy-now-button');
buyNowButton.addEventListener('click', () => {
  document.getElementById('siuuu-sound').play();
  alert('Redirecting to PancakeSwap...');
  window.open('https://pancakeswap.finance/', '_blank'); // Replace with the correct link
});

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle('active');
  });
});

// Hide the loading spinner when the page is fully loaded
window.addEventListener('load', () => {
  console.log('Page loaded');
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.classList.add('hide-spinner'); // Hide spinner
  }
});

// Fallback: Hide the spinner after 5 seconds (even if the page isn't fully loaded)
setTimeout(() => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.classList.add('hide-spinner');
  }
}, 5000); // 5 seconds
// Flag click functionality
document.querySelectorAll('.country-card').forEach((card) => {
  card.addEventListener('click', () => {
    const bgImage = card.getAttribute('data-bg'); // Get the background image URL
    const countryName = card.getAttribute('data-country'); // Get the country name

    // Create an overlay for the transition
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Fade in the overlay
    setTimeout(() => {
      overlay.classList.add('visible');
    }, 10);

    // After the overlay is visible, show the country-specific page
    setTimeout(() => {
      const countryPage = document.getElementById('country-page');
      countryPage.style.backgroundImage = `url(${bgImage})`;
      
      // Update the country name in both elements
      countryPage.querySelector('#country-name').textContent = countryName;
      countryPage.querySelector('#country-name-span').textContent = countryName;

      countryPage.classList.add('visible');

      // Add the country to the list
      const countryList = document.getElementById('country-names');
      if (!Array.from(countryList.children).some(li => li.textContent === countryName)) {
        const listItem = document.createElement('li');
        listItem.textContent = countryName;
        countryList.appendChild(listItem);
      }
    }, 500); // Delay to allow the overlay to fade in
  });
});
// Close the country page when clicking outside
document.addEventListener('click', (e) => {
  const countryPage = document.getElementById('country-page');
  const overlay = document.querySelector('.overlay');

  // Check if the click occurred outside the country page
  if (countryPage.classList.contains('visible') && !e.target.closest('#country-page')) {
    countryPage.classList.remove('visible');

    // Remove the overlay
    if (overlay) {
      overlay.classList.remove('visible');
      setTimeout(() => {
        overlay.remove();
      }, 500); // Delay to allow the overlay to fade out
    }
  }
});

// Share on X (Twitter)
const shareOnXButton = document.getElementById('share-on-x');
shareOnXButton.addEventListener('click', () => {
  const tweetText = encodeURIComponent("I just joined the Official CR7 Memecoin movement! 🚀 #CR7Memecoin #SIUUU");
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(tweetUrl, '_blank');
});


// JavaScript for Flip Effect and SIUUU Sound
document.querySelectorAll('.achievement-card').forEach((card) => {
  card.addEventListener('click', () => {
    const siuuuSound = document.getElementById('siuuu-sound');
    
    // Check if the card is already flipped
    if (!card.classList.contains('flipped')) {
      // Play the SIUUU sound only when flipping to the back
      siuuuSound.play();
    }

    // Toggle the flipped state
    card.classList.toggle('flipped');
  });
});

const joinMovementButton = document.getElementById('join-movement-button');
joinMovementButton.addEventListener('click', () => {
  // Play the SIUUU sound
  const siuuuSound = document.getElementById('siuuu-sound');
  siuuuSound.play();

  // Show a loading spinner
  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.classList.remove('hide-spinner');

  // Redirect after a short delay (e.g., 2 seconds)
  setTimeout(() => {
    window.open('https://x.com/cr7coin_onsol', '_blank'); // Replace with your desired link
    loadingSpinner.classList.add('hide-spinner'); // Hide spinner after redirect
  }, 2000); // 2-second delay
});

// Play SIUUU sound and redirect on "Buy $URCR7 Now" button click
const ctaButton = document.getElementById('cta-button');
ctaButton.addEventListener('click', () => {
  // Play the SIUUU sound
  const siuuuSound = document.getElementById('siuuu-sound');
  siuuuSound.play();

  // Redirect to PancakeSwap or your desired link
  alert('Redirecting to PancakeSwap...');
  window.open('https://pancakeswap.finance/', '_blank'); // Replace with the correct link
});

// Redirect to Cristiano Ronaldo's career achievements page on Wikipedia
document.getElementById('easter-egg-button').addEventListener('click', () => {
  window.open('https://en.wikipedia.org/wiki/List_of_career_achievements_by_Cristiano_Ronaldo', '_blank');
});


// Array of fun facts about Cristiano Ronaldo
const triviaFacts = [
  "Did you know? Cristiano Ronaldo has scored over 900 career goals!",
  "Cristiano Ronaldo has won 5 Ballon d'Or awards!",
  "Ronaldo is the all-time top scorer in the UEFA Champions League!",
  "He has scored a hat-trick in the World Cup, Euros, and Champions League!",
  "Ronaldo is the first player to score in 5 different World Cups!",
];

// Track the user's scroll position
let lastScrollPosition = window.scrollY;
let popupTimeout;

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

window.addEventListener('scroll', debounce(() => {
  const button = document.getElementById('easter-egg-button');
  const popup = document.getElementById('easter-egg-popup');
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight - 50) {
    button.classList.add('visible');
  } else {
    button.classList.remove('visible');
  }

  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition < lastScrollPosition - 50) {
    popup.classList.remove('visible');
    clearTimeout(popupTimeout);
  }

  lastScrollPosition = currentScrollPosition;
}, 100)); // Adjust the debounce time as needed
// Show a random trivia fact when the button is clicked
document.getElementById('easter-egg-button').addEventListener('click', () => {
  const randomFact = triviaFacts[Math.floor(Math.random() * triviaFacts.length)];
  document.getElementById('trivia-text').textContent = randomFact;
  const popup = document.getElementById('easter-egg-popup');
  popup.classList.add('visible');

  // Automatically hide the popup after 10 seconds
  popupTimeout = setTimeout(() => {
    popup.classList.remove('visible');
  }, 10000); // 10 seconds
});

// Function to fetch and update the holder count and list of holders
// Function to fetch and update the holder count
async function updateHolderCount() {
  try {
    const response = await fetch(`${backendUrl}/holder-count`);
    const data = await response.json();


      if (data.success) {
          // Update the holder count
          document.getElementById('holder-count').textContent = data.count;
      } else {
          console.error('Failed to fetch holder count:', data.error);
          document.getElementById('holder-count').textContent = "Error fetching holder count";
      }
  } catch (error) {
      console.error('An error occurred:', error);
      document.getElementById('holder-count').textContent = "Error fetching holder count";
  }
}

// Update the holder count when the page loads
window.addEventListener('load', updateHolderCount);

// Refresh the holder count every 10 seconds
setInterval(updateHolderCount, 10000);  // 10 seconds