import React from "react";
import "./styles.css";

function ProgressDots({ currentStep, totalSteps }) {
  return (
    <div className="progress-dots">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div
            key={index}
            className={`dot ${isActive ? "active" : ""} ${
              isCurrent ? "current" : ""
            }`}
          />
        );
      })}
    </div>
  );
}
