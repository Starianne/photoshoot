const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const cameraBtn = document.getElementById('cameraBtn');
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.disabled = true;

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Camera access denied:", err);
  });

cameraBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;


    context.drawImage(video, 0, 0);

    const dataURL = canvas.toDataURL('image/png');
    photo.src = dataURL;
    downloadBtn.disabled = false;

});        

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'photo.png';
    link.click();
        });