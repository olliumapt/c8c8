document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("signature-pad");
  const ctx = canvas.getContext("2d");
  let drawing = false;

  // 위치 계산 함수
  function getPosition(e) {
    if (e.touches && e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.offsetX,
        y: e.offsetY,
      };
    }
  }

  // 마우스/터치 이벤트 공통 처리
  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function endDraw(e) {
    drawing = false;
    e.preventDefault();
  }

  // 데스크탑 이벤트
  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endDraw);
  canvas.addEventListener("mouseout", endDraw);

  // 모바일 이벤트
  canvas.addEventListener("touchstart", startDraw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", endDraw);
  canvas.addEventListener("touchcancel", endDraw);

  // 서명 리셋
  document.getElementById("reset-signature").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // 작업 전/후 이미지 미리보기
  document.getElementById("beforeUpload").addEventListener("change", function () {
    const reader = new FileReader();
    reader.onload
