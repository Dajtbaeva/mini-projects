const video = document.querySelector(".webcam");
const videoCanvas = document.querySelector(".video");
const faceCanvas = document.querySelector(".face");
// eslint-disable-next-line no-undef
const faceDetector = new FaceDetector();
const videoCanvasCtx = videoCanvas.getContext("2d");
const faceCanvasCtx = faceCanvas.getContext("2d");
const SIZE = 10;
const SCALE = 1.5;
// function populate() {
//   navigator.mediaDevices
//     .getUserMedia({
//       video: {
//         width: 1280,
//         height: 720,
//       },
//     })
//     .then((stream) => {
//       console.log(stream);
//       video.srcObject = stream;

//       video.play();
//     });
// }

async function populate() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 1280,
      height: 720,
    },
  });
  videoCanvas.width = 1280;
  videoCanvas.height = 720;

  faceCanvas.width = 1280;
  faceCanvas.height = 720;
  video.srcObject = stream;
  await video.play();
}
function censor(boundingBox) {
  faceCanvasCtx.imageSmoothingEnabled = false;

  faceCanvasCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);

  // draw the small face
  faceCanvasCtx.drawImage(
    // 5 source args
    video, // where does the source come from?
    boundingBox.x, // where do we start the source pull from?
    boundingBox.y,
    boundingBox.width,
    boundingBox.height,
    // 4 draw args
    boundingBox.x, // where should we start drawing the x and y?
    boundingBox.y,
    SIZE,
    SIZE
  );
  // take that face back out and draw it back normal size
  // draw the small face back on, but scaled up
  const width = boundingBox.width * SCALE;
  const height = boundingBox.height * SCALE;
  faceCanvasCtx.drawImage(
    faceCanvas, // source
    boundingBox.x, // where do we start the source pull from?
    boundingBox.y,
    SIZE,
    SIZE,
    //drawing args
    boundingBox.x,
    boundingBox.y,
    width,
    height
  );
}
function draw({ boundingBox }) {
  const { left, top, width, height } = boundingBox;
  videoCanvasCtx.strokeStyle = "#ffc600";
  videoCanvasCtx.lineWidth = 2;
  videoCanvasCtx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
  censor(boundingBox);
  videoCanvasCtx.strokeRect(left, top, width, height);
}

async function detect() {
  const faces = await faceDetector.detect(video);
  //   console.log(faces);
  faces.forEach(draw);
  requestAnimationFrame(detect);
}
populate().then(detect);
