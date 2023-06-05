function capturePhoto() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        var video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        video.addEventListener("loadedmetadata", function() {
          var canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          var context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          var dataURL = canvas.toDataURL("image/png");
          savePhoto(dataURL);

          video.pause();
          video.srcObject = null;
          stream.getTracks()[0].stop();
        });
      })
      .catch(function(error) {
        console.error("Ошибка при получении доступа к камере: ", error);
      });
  }
}

function savePhoto(dataURL) {
  var link = document.createElement("a");
  link.href = dataURL;
  link.download = "photo.png";

  var clickEvent = document.createEvent("MouseEvent");
  clickEvent.initEvent("click", true, true);
  link.dispatchEvent(clickEvent);
}

capturePhoto();
