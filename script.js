const qrBox = document.getElementById("qrBox");
const logoPreview = document.getElementById("logoPreview");
const logoInput = document.getElementById("logoInput");
const downloadBtn = document.getElementById("downloadBtn");

let qrCanvas;

function generateQR() {

  const text = document.getElementById("qrText").value;

  if(text.trim() === ""){
    alert("Please enter something");
    return;
  }

  qrBox.innerHTML = "";

  new QRCode(qrBox, {
    text: text,
    width: 240,
    height: 240,
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {

    const qrImg = qrBox.querySelector("img");

    if(logoInput.files[0]){

      const reader = new FileReader();

      reader.onload = function(e){
        logoPreview.src = e.target.result;
        logoPreview.style.display = "block";
      }

      reader.readAsDataURL(logoInput.files[0]);

    } else {
      logoPreview.style.display = "none";
    }

    downloadBtn.style.display = "block";

  }, 300);
}

function downloadQR(){

  html2canvas(document.getElementById("qrWrapper")).then(canvas => {

    const link = document.createElement("a");

    link.download = "qr-code.png";

    link.href = canvas.toDataURL();

    link.click();

  });

}