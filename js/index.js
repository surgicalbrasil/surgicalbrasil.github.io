// Get the header element
const header = document.querySelector('.header');

// Get the initial position of the header
const headerOffsetTop = header.offsetTop;

// Function to handle the scroll event
function handleScroll() {
  // Get the current scroll position
  const scrollPosition = window.pageYOffset;

  // Check if the scroll position is below the header's original position
  if (scrollPosition >= headerOffsetTop) {
    // Add a CSS class to make the header sticky
    header.classList.add('sticky');

    // Add padding to the top of the body element
    document.body.style.paddingTop = header.offsetHeight + 'px';
  } else {
    // Remove the CSS class if the scroll position is above the header's original position
    header.classList.remove('sticky');

    // Remove the padding from the top of the body element
    document.body.style.paddingTop = 0;
  }
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

