document.addEventListener("DOMContentLoaded", function() {
    const regAdminBtn = document.getElementById('reg-admin-btn');
    const registerForm = document.getElementById('registerForm');
  
    if (regAdminBtn && registerForm) { // Check if elements exist
      regAdminBtn.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.style.display = registerForm.style.display === 'block' ? 'none' : 'block';
      });
    } else {
      console.error('One or both elements not found.');
    }
  });
  