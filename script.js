// 서명 패드 초기화
const canvas = document.getElementById("signature");
const ctx = canvas.getContext("2d");
let drawing = false;

// PC용 마우스 이벤트
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});
canvas.addEventListener("mouseup", () => {
  drawing = false;
});
canvas.addEventListener("mouseleave", () => {
  drawing = false;
});

// 모바일 터치 이벤트
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
  ctx.stroke();
});

// 서명 리셋 버튼 기능
function clearSignature() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 이미지 미리보기
function previewImage(event, id) {
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById(id).src = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

// 보고서 저장
function saveReport() {
  const report = {
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

  const savedReports = JSON.parse(localStorage.getItem("reports") || "[]");
  savedReports.push(report);
  localStorage.setItem("reports", JSON.stringify(savedReports));

  alert("보고서가 저장되었습니다!");
  window.location.href = "board.html";
}
