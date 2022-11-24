import React, { useRef } from 'react';
import * as faceapi from 'face-api.js';
import { useEffect } from 'react';
import './styles.module.css';

const DetectComponent: React.FC = () => {
  // const { previewStream, status, startRecording, stopRecording, mediaBlobUrl } =
  //   useReactMediaRecorder({
  //     video: true,
  //   });

  const videoHeight = 480;
  const videoWidth = 640;
  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (!videoRef.current) {
        console.log('video not exist');
        return;
      }

      videoRef.current.srcObject = mediaStream;

    } catch (error) {
      console.error(error)
    }
  };



  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = `${window.location.origin}/models`;

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      await startVideo();
    };

    if (videoRef.current) {
      loadModels();
    }
  }, [videoRef]);

  useEffect(() => {
    if(!videoRef.current) {
      return;
    }

    videoRef.current?.addEventListener('play', () => {
      const ele = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.innerHTML = ele;

      // document.body.append(canvas)
      // canvas.classList.add('canvas');
      const displaySize = { width: videoRef.current?.width || 0, height: videoRef.current?.height || 0}
      faceapi.matchDimensions(canvasRef.current, displaySize)
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvasRef.current.getContext('2d')?.clearRect(0, 0, videoWidth, videoHeight)
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections)

        console.log(detections);
      }, 100)
    })
  }, [videoRef])

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width={videoWidth}
        height={videoHeight}
      />
      <canvas style={{position: 'absolute'}} ref={canvasRef} />
    </div>
  );
}

export default DetectComponent;
