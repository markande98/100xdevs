import { useState } from "react";
import { useRef } from "react";

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
  const [, setCount] = useState(0);
  const noOfTimesRendered = useRef(0);

  const handleReRender = () => {
    setCount((c) => c + 1);
  };

  noOfTimesRendered.current = noOfTimesRendered.current + 1;
  return (
    <div>
      <p>This component has rendered {noOfTimesRendered.current} times.</p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
