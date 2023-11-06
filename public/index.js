// Debounced Scroll Event
const navbar = document.querySelector('.navbar');
let isDropdownActive = false;

function updateNavbar() {
  if (window.scrollY > 10 || isDropdownActive) {
    navbar.classList.add('gradient-background');
  } else {
    navbar.classList.remove('gradient-background');
  }
}


function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

const debouncedUpdateNavbar = debounce(updateNavbar, 10);

// Call updateNavbar once when the document is ready to handle the initial state
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();


  document.addEventListener('scroll', () => {
    debouncedUpdateNavbar();
  });
});

// Click Event for Button
const toggleButton = document.getElementById('toggleGradientButton');
toggleButton.addEventListener('click', () => {
  isDropdownActive = !isDropdownActive; // Toggle the dropdown state
  updateNavbar(); // Update the navbar based on the new state
});


// Consolidate Animation Using requestAnimationFrame
function animateElements() {
  const fadeElements = document.querySelectorAll('.fade-in');
  const altElements = document.querySelectorAll('.fade-in-alt');
  const cards = document.querySelectorAll('.fade-in-card');
  const sideElements = document.querySelectorAll('.fade-in-side');
  const elementsToObserve = document.querySelectorAll('.content-hidden');

  function animateElement(element) {
    element.style.opacity = 1;
    element.style.transform = 'translateY(0)';
  }

  function animateElementAlt(element) {
    element.classList.add('active');
  }

  function revealCards() {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('active');
      }, 400 * index); 
    });
  }

  function revealSideElements() {
    sideElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('active');
      }, 400 * index);
    });
  }

  fadeElements.forEach((element) => {
    requestAnimationFrame(() => animateElement(element));
  });

  altElements.forEach((element) => {
    requestAnimationFrame(() => animateElementAlt(element));
  });

  requestAnimationFrame(animateElements);

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('content-visible');
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.4,
  });

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });

  // Observe the section to trigger the card animation
  const section = document.querySelector('.third-container');

//Ensure that the 'section' element exists

  // Observe elements to trigger the side element animation
  sideElements.forEach(element => {
    observer.observe(element);
  });

  // Trigger the card animation when the document is ready
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealCards();
        revealSideElements();
        sectionObserver.unobserve(entry.target);
      }
    });
  });

  sectionObserver.observe(section);
}


// Start the animations when the document is ready
document.addEventListener('DOMContentLoaded', animateElements);



document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.fade-in-side');

  function revealElements() {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('active');
      }, 400 * index);
    });
  }
  

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealElements();
        observer.unobserve(entry.target);
      }
    });
  });

  elements.forEach(element => {
    observer.observe(element);
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const imageCarousel = document.getElementById("imageCarousel");

  if (prevButton && nextButton && imageCarousel) {
    prevButton.addEventListener("click", function () {
      const carousel = new bootstrap.Carousel(imageCarousel);
      carousel.prev();
    });

    nextButton.addEventListener("click", function () {
      const carousel = new bootstrap.Carousel(imageCarousel);
      carousel.next();
    });
  } else {
    console.error("One or more of the required elements were not found.");
  }
});
