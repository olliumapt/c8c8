document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("signature-pad");
  const ctx = canvas.getContext("2d");

  // 캔버스를 현재 화면에 맞게 자동 조정
  function resizeCanvasToDisplaySize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvasToDisplaySize();

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

  // 모바일용 터치 이벤트
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    drawing = true;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (!drawing) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  canvas.addEventListener("touchend", () => {
    drawing = false;
  });

  // 서명 리셋 버튼 동작
  document.getElementById("reset-signature").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // 작업 전 이미지 미리보기
  document.getElementById("beforeUpload").addEventListener("change", function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("beforeImage").src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  });

  // 작업 후 이미지 미리보기
  document.getElementById("afterUpload").addEventListener("change", function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("afterImage").src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  });

  // 보고서 저장
  document.getElementById("save-button").addEventListener("click", () => {
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

    alert("보고서가 저장되었습니다! 게시판에서 확인하세요.");
    window.location.href = "board.html";
  });
});
