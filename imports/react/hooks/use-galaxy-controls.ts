import React from 'react';
import { useControls } from 'leva';

export function useGalaxyControls() {
  const galaxyControls = useControls({
    numStars: {
      value: 1000,
      min: 100,
      max: 10000,
      step: 10,
    },
    starSizeMin: {
      value: 0.05,
      min: 0.01,
      max: 3,
      step: 0.01,
    },
    starSizeMax: {
      value: 3,
      min: 1,
      max: 10,
      step: 0.5,
    },
    hazeSizeMin: {
      value: 20.0,
      min: 1.0,
      max: 100.0,
      step: 1.0,
    },
    hazeSizeMax: {
      value: 50.0,
      min: 1.0,
      max: 100.0,
      step: 1.0,
    },
    hazeOpacity: {
      value: 0.15,
      min: 0,
      max: 1,
      step: 0.05,
    },
    hazeRatio: {
      value: 0.8,
      min: 0,
      max: 1,
      step: 0.1,
    },
    coreXdist: {
      value: 40,
      min: 10,
      max: 100,
      step: 10,
    },
    coreYdist: {
      value: 40,
      min: 10,
      max: 100,
      step: 10,
    },
    thickness: {
      value: 6,
      min: 1,
      max: 10,
      step: 1,
    },
    outerCoreXdist: {
      value: 80,
      min: 10,
      max: 200,
      step: 10,
    },
    outerCoreYdist: {
      value: 80,
      min: 10,
      max: 200,
      step: 10,
    },
    numArms: {
      value: 2.0,
      min: 0,
      max: 10.0,
      step: 1.0,
    },
    spiralForce: {
      value: 2.5,
      min: 0,
      max: 10.0,
      step: 0.1,
    },
    armXdist: {
      value: 80,
      min: 10,
      max: 200,
      step: 1,
    },
    armYdist: {
      value: 50,
      min: 10,
      max: 200,
      step: 1,
    },
    armXmean: {
      value: 180,
      min: 10,
      max: 300,
      step: 5,
    },
    armYmean: {
      value: 100,
      min: 10,
      max: 300,
      step: 5,
    },
  });
  return galaxyControls;
}