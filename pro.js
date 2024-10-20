let btn = document.querySelector('.mode-btn');

function mode() {
 document.body.classList.toggle('dark');
 if (btn.textContent === 'Normal') {
  btn.textContent = 'Dark';
 } else {
  btn.textContent = 'Normal';
 }
}

btn.addEventListener('click', mode);