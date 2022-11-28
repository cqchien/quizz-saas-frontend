import React, { useRef } from 'react';
import * as faceapi from 'face-api.js';
import { useEffect } from 'react';
import { notification } from 'antd';

const DetectComponent: React.FC = () => {
  // const { previewStream, status, startRecording, stopRecording, mediaBlobUrl } =
  //   useReactMediaRecorder({
  //     video: true,
  //   });

  const videoHeight = 180;
  const videoWidth = 340;
  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  let timeOutOfTheCam = 0;
  let numberOfTime = 0;

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (!videoRef.current) {
        return;
      }

      videoRef.current.srcObject = mediaStream;
    } catch (error) {
      console.error(error);
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
    if (!videoRef.current) {
      return;
    }

    videoRef.current?.addEventListener('play', () => {
      const ele = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.innerHTML = ele;

      // document.body.append(canvas)
      // canvas.classList.add('canvas');
      const displaySize = {
        width: videoRef.current?.width || 0,
        height: videoRef.current?.height || 0,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      const intervalId = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvasRef.current.getContext('2d')?.clearRect(0, 0, videoWidth, videoHeight);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

        if (detections.length === 0) {
          timeOutOfTheCam += 100;
        } else {
          timeOutOfTheCam = 0;
          numberOfTime = 0;
        }

        if (timeOutOfTheCam === 5 * 1000) {
          numberOfTime += 1;
          timeOutOfTheCam = 0;
        }

        if (numberOfTime > 0 && numberOfTime < 3 && timeOutOfTheCam === 0) {
          notification.warning({
            message: `You are out of camera ${numberOfTime} times. If you out of camera 3 times, you will be forced to submit exam`,
            duration: 3000,
          });
        }

        if (numberOfTime === 5) {
          notification.error({
            message: `You are out of camera ${numberOfTime} times, so you will be forced to submit.`,
            duration: 3000,
          });

          clearInterval(intervalId);
          // call API

          return;
        }
      }, 100);
    });
  }, [videoRef]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        top: 'auto',
      }}
    >
      <video ref={videoRef} autoPlay muted width={videoWidth} height={videoHeight} />
      <canvas style={{ position: 'absolute' }} ref={canvasRef} />
    </div>
  );
};

export default DetectComponent;
