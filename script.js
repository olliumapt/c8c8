// 이미지 미리보기
function previewImage(event, targetId) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById(targetId);
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 서명 패드
const canvas = document.getElementById('signature');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.width = 300;
canvas.height = 150;

canvas.addEventListener('mousedown', e => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener('mousemove', e => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseleave', () => drawing = false);

function clearSignature() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 보고서 저장 + 게시판 이동
function saveReport() {
  const data = {
    workDate: document.getElementById("workDate").value,
    address: document.getElementById("address").value,
    complaint: document.getElementById("complaint").value,
    result: document.getElementById("result").value,
    worker: document.getElementById("worker").value,
    satisfaction: document.getElementById("satisfaction").value,
    beforeImage: document.getElementById("beforeImage").src,
    afterImage: document.getElementById("afterImage").src,
    signature: canvas.toDataURL()
  };

  let reports = JSON.parse(localStorage.getItem("reports") || "[]");
  reports.push(data);
  localStorage.setItem("reports", JSON.stringify(reports));

  // 게시판 페이지로 이동
  window.location.href = "board.html";
}
