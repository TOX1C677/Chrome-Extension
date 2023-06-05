document.addEventListener('DOMContentLoaded', function() {
  var captureButton = document.getElementById('captureButton');

  captureButton.addEventListener('click', function() {
    // Запрашиваем доступ к камере
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Конвертируем изображение в формат Data URL
        var dataURL = canvas.toDataURL('image/png');

        // Создаем ссылку для скачивания
        var a = document.createElement('a');
        a.href = dataURL;
        a.download = 'photo.png';

        // Создаем и инициируем клик на ссылке для скачивания
        var event = new MouseEvent('click');
        a.dispatchEvent(event);

        // Освобождаем ресурсы
        video.pause();
        video.src = '';
        stream.getTracks()[0].stop();
        document.removeChild(video);
        document.removeChild(canvas);
      })
      .catch(function(error) {
        console.error('Ошибка при получении доступа к камере: ', error);
      });
  });
});