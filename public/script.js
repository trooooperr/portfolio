'use strict';

// ===================
// UTILITY FUNCTIONS
// ===================

/**
 * Toggles the 'active' class on an element.
 * @param {HTMLElement} elem The element to toggle the class on.
 */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ===================
// SIDEBAR FUNCTIONALITY
// ===================

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// ===================
// TESTIMONIALS MODAL
// ===================

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

for (const item of testimonialsItem) {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// ===================
// PROJECTS FILTERING
// ===================

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

const filterFunc = function (selectedValue) {
  for (const item of filterItems) {
    const category = item.dataset.category;
    if (selectedValue === "all" || selectedValue === category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
};

for (const item of selectItems) {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

let lastClickedBtn = filterBtns[0];
for (const btn of filterBtns) {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// ===================
// CONTACT FORM
// ===================

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const successOverlay = document.getElementById('success-overlay');
const closeDialogueBtn = document.getElementById('close-dialogue-btn');

const checkFormValidity = () => {
  let allFilled = true;
  formInputs.forEach(input => {
    if (input.value.trim() !== '') {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }
    if (input.hasAttribute('required') && !input.value.trim()) {
      allFilled = false;
    }
  });
  formBtn.disabled = !allFilled;
};

for (const input of formInputs) {
  input.addEventListener("input", checkFormValidity);
}
checkFormValidity();

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  formBtn.disabled = true;
  formBtn.querySelector('span').textContent = 'Sending...';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      successOverlay.classList.add('visible');
      form.reset();
      checkFormValidity();
    } else {
      showError('Oops! There was an error sending your message.');
    }
  } catch (error) {
    showError('Oops! An error occurred. Please try again later.');
  } finally {
    formBtn.disabled = false;
    formBtn.querySelector('span').textContent = 'Send Message';
  }
});

closeDialogueBtn.addEventListener('click', () => {
  successOverlay.classList.remove('visible');
});

function showError(message) {
  const formStatus = document.getElementById('form-status');
  if (!formStatus) return;

  formStatus.style.backgroundColor = '#FF6B6B';
  formStatus.style.color = '#222';
  formStatus.style.padding = '12px 20px';
  formStatus.style.borderRadius = '10px';
  formStatus.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
  formStatus.style.fontWeight = '600';
  formStatus.style.textAlign = 'center';
  formStatus.style.display = 'block';
  formStatus.style.opacity = '0';
  formStatus.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  formStatus.textContent = message;

  setTimeout(() => {
    formStatus.style.opacity = '1';
    formStatus.style.transform = 'translateY(-5px)';
  }, 10);

  setTimeout(() => {
    formStatus.style.opacity = '0';
    formStatus.style.transform = 'translateY(0)';
    setTimeout(() => formStatus.style.display = 'none', 300);
  }, 5000);
}

// ===================
// PAGE NAVIGATION
// ===================

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (const link of navigationLinks) {
  link.addEventListener("click", function () {
    const targetPageName = this.dataset.pageName;
    for (const page of pages) {
      if (page.dataset.page === targetPageName) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    }
    for (const navLink of navigationLinks) {
      navLink.classList.remove("active");
    }
    this.classList.add("active");
    window.scrollTo(0, 0);
  });
}

// ===================
// DYNAMIC SKILLS SCROLLER
// ===================

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skills-track-combined').forEach(track => {
    const originalSkills = Array.from(track.children);
    originalSkills.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
  });
});

// ===================
// RESUME DOWNLOAD
// ===================

const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const pdfUrl = "/images/resume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Resume_AlokGupta.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}