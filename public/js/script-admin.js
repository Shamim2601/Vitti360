document.addEventListener("DOMContentLoaded", function () {
    const regAdminBtn = document.getElementById('reg-admin-btn');
    const registerForm = document.getElementById('registerForm');
    const addQsBtn = document.getElementById('add-qs-btn');
    const addQuestionForm = document.getElementById('addQuestionForm');

    if (regAdminBtn && registerForm) {
      regAdminBtn.addEventListener('click', function (event) {
        event.preventDefault();
        registerForm.style.display = registerForm.style.display === 'block' ? 'none' : 'block';
      });
    } else {
      console.error('Register Admin button or form not found.');
    }

    if (addQsBtn && addQuestionForm) {
      addQsBtn.addEventListener('click', function (event) {
        event.preventDefault();
        addQuestionForm.style.display = addQuestionForm.style.display === 'block' ? 'none' : 'block';
      });
    } else {
      console.error('Add Question button or form not found.');
    }
  });