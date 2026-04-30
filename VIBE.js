import * as faceDetection from '@tensorflow-models/face-detection';

const setupDetector = async () => {
  const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
  const detector = await faceDetection.createDetector(model, {
    runtime: 'tfjs',
    maxFaces: 1,
    modelType: 'short' // 'short' is better for close-range/partial visibility
  });

  const detect = async () => {
    const faces = await detector.estimateFaces(videoRef.current, {
      flipHorizontal: false
    });
    // Lowering the confidence threshold in your logic helps detect partially covered faces
    const validFaces = faces.filter(face => face.score > 0.35); 
    requestAnimationFrame(detect);
  };
};