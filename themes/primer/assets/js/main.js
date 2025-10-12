function copyAndConfirm(el) {
  const text = el.previousElementSibling.innerText;
  const copyIcon = el.querySelector('.octicon-copy');
  const checkIcon = el.querySelector('.octicon-check');
  const feedback = el.nextElementSibling; // The sr-only span for screen reader announcements

  navigator.clipboard.writeText(text).then(() => {
    copyIcon.classList.add('d-none');
    checkIcon.classList.remove('d-none');
    el.setAttribute('aria-label', 'Copied!');
    feedback.textContent = 'Copied to clipboard!';

    setTimeout(() => {
      copyIcon.classList.remove('d-none');
      checkIcon.classList.add('d-none');
      el.setAttribute('aria-label', 'Copy to clipboard');
      feedback.textContent = '';
    }, 2000); // Matches GitHub's typical feedback duration
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => copyAndConfirm(btn));
  });
});

if ('serviceWorker' in navigator) { 
  navigator.serviceWorker.register('/sw.min.js');                                                 
}
