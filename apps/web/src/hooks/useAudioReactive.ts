'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioReactiveOptions {
  enabled: boolean;
  smoothing?: number;
}

/**
 * Hook for audio-reactive visual effects using Web Audio API
 * Provides amplitude-based intensity (0-1) that can drive visual effects
 */
export function useAudioReactive({ enabled, smoothing = 0.8 }: UseAudioReactiveOptions) {
  const [intensity, setIntensity] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const smoothedIntensityRef = useRef(0);

  const stopAudio = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    dataArrayRef.current = null;
    setIntensity(0);
    smoothedIntensityRef.current = 0;
  }, []);

  const startAudio = useCallback(async () => {
    try {
      setError(null);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionGranted(true);

      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = smoothing;
      analyserRef.current = analyser;

      // Connect microphone to analyser
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Create data array for frequency data
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(new ArrayBuffer(bufferLength));
      dataArrayRef.current = dataArray;

      // Start analyzing
      const analyze = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;

        const dataArray = dataArrayRef.current;
        analyserRef.current.getByteFrequencyData(dataArray as any);
        
        // Calculate average amplitude
        const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
        const average = sum / bufferLength;
        const normalized = average / 255; // Normalize to 0-1

        // Smooth the intensity
        smoothedIntensityRef.current = 
          smoothedIntensityRef.current * smoothing + normalized * (1 - smoothing);
        
        setIntensity(smoothedIntensityRef.current);
        
        animationFrameRef.current = requestAnimationFrame(analyze);
      };

      analyze();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access microphone';
      setError(errorMessage);
      setPermissionGranted(false);
      console.warn('Audio reactive mode failed:', errorMessage);
    }
  }, [smoothing]);

  useEffect(() => {
    if (enabled) {
      startAudio();
    } else {
      stopAudio();
    }

    return () => {
      stopAudio();
    };
  }, [enabled, startAudio, stopAudio]);

  return {
    intensity,
    error,
    permissionGranted,
    requestPermission: startAudio,
  };
}
