//import React from 'react'
type SlangSelectProps = {
  word: string;
  selected: boolean;
  onClick: () => void;
};
export default function SlangSelect({ word, selected, onClick }: SlangSelectProps) {
  return (
    <button
      onClick={onClick}
      style={{
        border: selected ? "2px solid #4A90E2" : "2px solid #999",
        backgroundColor: selected ? "#4A90E2" : "white",
        color: selected ? "white" : "black",
        padding: "8px 12px",
        borderRadius: "6px",
        margin: "4px",
        cursor: "pointer",
      }}
    >
      {word}
    </button>
  );
}
