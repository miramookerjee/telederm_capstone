// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    var x = document.getElementById("camera--view");
    const imgs = document.querySelectorAll('.taken');

    imgs.forEach(img => {
        if (x.style.filter == "saturate(4)") {
            img.style.filter = "saturate(4)";
        }  else {
            img.style.filter = "saturate(1)";
        }
    });
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

// change the saturation of the video when clicked
function changeFilter() {
    var x = document.getElementById("camera--view");
    if (x.style.filter == "saturate(1)") {
      x.style.filter = "saturate(4)";
    } else {
      x.style.filter = "saturate(1)";
    }
  }
