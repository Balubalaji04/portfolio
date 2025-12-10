// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('nav').classList.remove('open');
    }
  });
});

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Resume upload / preview / download
const uploadBtn = document.getElementById('uploadBtn');
const resumeFileInput = document.getElementById('resumeFile');
const downloadLink = document.getElementById('downloadLink');
const viewLink = document.getElementById('viewLink');

uploadBtn.addEventListener('click', () => {
  const file = resumeFileInput.files[0];
  if (!file) {
    alert('Please choose a PDF file to upload.');
    return;
  }
  if (file.type !== 'application/pdf') {
    alert('Only PDF files are supported.');
    return;
  }

  // Create a temporary URL to allow download and view.
  const blobUrl = URL.createObjectURL(file);
  downloadLink.href = blobUrl;
  downloadLink.download = file.name || 'Mallineni_Balaji_Resume.pdf';
  viewLink.href = blobUrl;

  downloadLink.hidden = false;
  viewLink.hidden = false;

  // Optional: Revoke URL on navigation away.
  window.addEventListener('beforeunload', () => URL.revokeObjectURL(blobUrl));
  alert('Resume ready. Use "Download resume" or "View resume" buttons.');
});

// Contact form validation (client-side only)
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    contactStatus.textContent = 'Please fill in all fields.';
    contactStatus.style.color = '#f59e0b';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    contactStatus.textContent = 'Please enter a valid email address.';
    contactStatus.style.color = '#f59e0b';
    return;
  }

  // Demo only: In production, submit via a backend or service (EmailJS, Formspree).
  contactStatus.textContent = 'Message validated locally. Connect to a backend to send.';
  contactStatus.style.color = '#22c55e';

  // Reset the form
  contactForm.reset();
});