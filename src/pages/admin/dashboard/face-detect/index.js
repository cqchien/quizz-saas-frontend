import React from 'react';
import * as faceapi from 'face-api.js';
import { useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

function DetectComponent() {
  const { previewStream, status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
    });

  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef();
  const videoRef = useRef();

  const handleSubmitExam = async () => {
    stopRecording();
    const mediaBlob = await fetch(mediaBlobUrl).then((response) => response.blob());
    const url = window.URL.createObjectURL(mediaBlob);
    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'currentVideo.mp4');
    tempLink.click();
  };

  const handleRecording = () => {
    console.log('process.env.PUBLIC_URL', process.env.ASSET_PATH);
    const loadModels = async () => {
      const MODEL_URL = '../../../../../public/models';
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(startVideo());
    };
    loadModels();
  };

  const startVideo = () => {
    navigator.getUserMedia(
      { video: {} },
      (stream) => (videoRef.current.srcObject = stream),
      () => {},
    );
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizeDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);
      console.log(detections);
    }, 100);
  };

  return (
    <>
      <p>{status}</p>
      <button onClick={handleRecording}>Start Recording</button>
      <button onClick={handleSubmitExam}>Submit</button>
      <video
        ref={videoRef}
        autoPlay
        muted
        width={videoWidth}
        height={videoHeight}
        onPlay={handleVideoOnPlay}
      />
      <canvas ref={canvasRef} />
    </>
  );
}

export default DetectComponent;
