/* eslint-disable no-undef */
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
function startLive() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      video.srcObject = stream;
      video.style.display = "none";
      canvas.style.display = "block";

      options = {
        multiplier: 0.75,
        stride: 32,
        quantBytes: 4,
      };
      bodyPix
        .load(options)
        .then(async (net) => {
          while (canvas.style.display === "block") {
            const segmentation = await net.segmentPerson(video);

            const backgroundBlurAmount = 10;
            const edgeBlurAmount = 10;
            const flipHorizontal = true;

            bodyPix.drawBokehEffect(
              canvas,
              video,
              segmentation,
              backgroundBlurAmount,
              edgeBlurAmount,
              flipHorizontal
            );
          }
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}
startLive();
