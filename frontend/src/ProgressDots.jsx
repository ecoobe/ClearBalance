import React from "react";
import "./styles.css";

export default function ProgressDots({ currentStep, totalSteps }) {
  return (
    <div className="progress-dots">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`dot ${index < currentStep ? "active" : ""}`}
        />
      ))}
    </div>
  );
}
