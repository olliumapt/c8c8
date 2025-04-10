document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reportForm");
  const signaturePad = new SignaturePad(document.getElementById("signature-pad"));

  function updateImagePreview(inputElement, previewContainerId) {
    const previewContainer = document.getElementById(previewContainerId);
    previewContainer.innerHTML = "";

    Array.from(inputElement.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("thumbnail");
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  ["beforeImages", "afterImages"].forEach((id) => {
    const input = document.getElementById(id);
    input.setAttribute("multiple", "multiple");
    input.setAttribute("accept", "image/*");
    input.addEventListener("change", function () {
      updateImagePreview(this, `${id}Preview`);
    });
  });

  document.getElementById("clear-signature").addEventListener("click", function () {
    signaturePad.clear();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const reportContainer = document.createElement("div");
    reportContainer.className = "report";

    const formData = new FormData(form);
    const date = formData.get("date");
    const address = formData.get("address");
    const issue = formData.get("issue");
    const result = formData.get("result");
    const manager = formData.get("manager");
    const satisfaction = formData.get("satisfaction");

    const signatureImage = signaturePad.toDataURL();

    const createInfoRow = (label, value) => {
      const row = document.createElement("p");
      row.innerHTML = `<strong>${label}:</strong> ${value}`;
      return row;
    };

    reportContainer.appendChild(createInfoRow("작업일자", date));
    reportContainer.appendChild(createInfoRow("세대주소", address));
    reportContainer.appendChild(createInfoRow("민원내용", issue));
    reportContainer.appendChild(createInfoRow("처리결과", result));
    reportContainer.appendChild(createInfoRow("담당자", manager));
    reportContainer.appendChild(createInfoRow("만족도", "★".repeat(parseInt(satisfaction))));

    const addImageSection = (label, files) => {
      const sectionTitle = document.createElement("h4");
      sectionTitle.textContent = label;
      reportContainer.appendChild(sectionTitle);
      const imgContainer = document.createElement("div");
      imgContainer.className = "image-section";

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.classList.add("thumbnail");
          imgContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });

      reportContainer.appendChild(imgContainer);
    };

    addImageSection("작업 전 사진", document.getElementById("beforeImages").files);
    addImageSection("작업 후 사진", document.getElementById("afterImages").files);

    const signatureTitle = document.createElement("h4");
    signatureTitle.textContent = "입주자 서명";
    reportContainer.appendChild(signatureTitle);

    const signatureImg = document.createElement("img");
    signatureImg.src = signatureImage;
    signatureImg.classList.add("signature-image");
    reportContainer.appendChild(signatureImg);

    const savedReports = document.getElementById("savedReports");
    savedReports.appendChild(reportContainer);

    form.reset();
    signaturePad.clear();
    document.getElementById("beforePreview").innerHTML = "";
    document.getElementById("afterPreview").innerHTML = "";

    const formSection = document.getElementById("formSection");
    const reportSection = document.getElementById("reportSection");
    formSection.style.display = "none";
    reportSection.style.display = "block";

    window.scrollTo({ top: reportSection.offsetTop, behavior: 'smooth' });
  });
});
