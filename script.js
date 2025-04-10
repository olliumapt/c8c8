document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("signature-pad");
  const ctx = canvas.getContext("2d");
  let drawing = false;

  // 서명 그리기
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

  document.getElementById("reset-signature").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // 작업 전/후 이미지 미리보기
  document.getElementById("beforeUpload").addEventListener("change", function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("beforeImage").src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  });

  document.getElementById("afterUpload").addEventListener("change", function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("afterImage").src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  });

  // 보고서 저장 함수
  window.saveReport = function () {
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
  };
});
