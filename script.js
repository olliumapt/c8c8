
function previewImage(event, id) {
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById(id).src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

const canvas = document.getElementById('signature');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', e => {
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  drawing = true;
});
canvas.addEventListener('mousemove', e => {
  if (!drawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

canvas.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  drawing = true;
}, { passive: false });

canvas.addEventListener('touchmove', e => {
  if (!drawing) return;
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
  ctx.stroke();
}, { passive: false });

canvas.addEventListener('touchend', () => drawing = false);

function clearSignature() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveReport() {
  html2canvas(document.querySelector(".report-form")).then(canvas => {
    const link = document.createElement('a');
    link.download = '세대_민원처리_보고서.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}
