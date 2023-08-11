document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.querySelector(".dark-mode-toggle");
    const icon = darkModeToggle.querySelector(".fa-regular");
  
    darkModeToggle.addEventListener("click", function() {
      document.body.classList.toggle("dark-theme");
      icon.classList.toggle("fa-moon");
      icon.classList.toggle("fa-sun");
    });
  });
  