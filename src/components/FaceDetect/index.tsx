import React, { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useEffect } from 'react';
import { notification } from 'antd';
import './index.less';

interface IProps {
  onSubmitExam: any;
  setIntervalId: any;
}

const DetectComponent: React.FC<IProps> = ({ onSubmitExam, setIntervalId }) => {
  const [numberOfTime, setNumberOfTime] = useState(0);
  // const { previewStream, status, startRecording, stopRecording, mediaBlobUrl } =
  //   useReactMediaRecorder({
  //     video: true,
  //   });

  const videoHeight = 180;
  const videoWidth = 340;
  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const limitTimeOutOfTheCam = 3;
  let timeOutOfTheCam = 0;

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
        let intervalNumberOfTime = numberOfTime;
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
          setNumberOfTime(0);
        }

        if (timeOutOfTheCam === 5 * 1000) {
          setNumberOfTime((x) => {
            intervalNumberOfTime = x + 1;
            return x + 1;
          });
          timeOutOfTheCam = 0;
        }

        if (intervalNumberOfTime > 0 && intervalNumberOfTime < 3 && timeOutOfTheCam === 0) {
          notification.warning({
            message: `You are out of camera ${intervalNumberOfTime} times. If you out of camera ${limitTimeOutOfTheCam} times, you will be forced to submit exam`,
          });
        }

        if (intervalNumberOfTime >= limitTimeOutOfTheCam) {
          notification.error({
            message: `You are out of camera ${intervalNumberOfTime} times, so you will be forced to submit.`,
          });
          clearInterval(intervalId);
          return;
        }
      }, 100);
      setIntervalId(intervalId);
    });
  }, [videoRef]);

  useEffect(() => {
    if (numberOfTime >= limitTimeOutOfTheCam) {
      onSubmitExam();
    }
  }, [numberOfTime]);

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
