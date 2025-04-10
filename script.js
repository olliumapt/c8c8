let isDrawing = false;
let lastX = 0;
let lastY = 0;

const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");

// 캔버스 해상도 설정
function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  ctx.scale(ratio, ratio);
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
}
resizeCanvas();

// 터치 및 마우스 이벤트 공통 처리
function getEventPosition(e) {
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
      y: e.touches[0].clientY - canvas.getBoundingClientRect().top,
    };
  } else {
    return {
      x: e.clientX - canvas.getBoundingClientRect().left,
      y: e.clientY - canvas.getBoundingClientRect().top,
    };
  }
}

function startDrawing(e) {
  isDrawing = true;
  const pos = getEventPosition(e);
  lastX = pos.x;
  lastY = pos.y;
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault(); // 모바일에서 스크롤 방지
  const pos = getEventPosition(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  lastX = pos.x;
  lastY = pos.y;
}

function stopDrawing() {
  isDrawing = false;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", startDrawing, { passive: false });
canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", stopDrawing);

// 서명 리셋
document.getElementById("reset-signature").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 이미지 업로드 및 썸네일
document.getElementById("beforeUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById("beforeImage").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("afterUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById("afterImage").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// 보고서 저장 및 게시판 이동
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

  // 필수 항목 체크
  for (let key in data) {
    if (!data[key]) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }
  }

  // 저장 및 페이지 이동
  const existing = JSON.parse(localStorage.getItem("reports") || "[]");
  existing.push(data);
  localStorage.setItem("reports", JSON.stringify(existing));
  window.location.href = "board.html";
}
