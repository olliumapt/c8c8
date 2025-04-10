// 🖌️ 서명 패드 초기화
const canvas = document.getElementById("signature");
const ctx = canvas.getContext("2d");
let drawing = false;

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

function clearSignature() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 📷 이미지 미리보기
function previewImage(event, targetId) {
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById(targetId).src = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

// 💾 보고서 저장
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

  alert("보고서가 저장되었습니다! 게시판으로 이동합니다.");
  window.location.href = "board.html";
}
