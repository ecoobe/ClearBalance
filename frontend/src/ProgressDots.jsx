import React from "react";
import "./styles.css";

export default function ProgressDots({ currentStep, totalSteps }) {
  return (
    <div className="progress-dots">
      {[...Array(totalSteps)].map((_, index) => {
        const isCompleted = index < currentStep - 1;
        const isActive = index === currentStep - 1;

        return (
          <div
            key={index}
            className={`dot ${isCompleted ? "completed" : ""} ${
              isActive ? "active" : ""
            }`}
          />
        );
      })}
    </div>
  );
}
