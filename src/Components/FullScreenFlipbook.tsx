import React, { useEffect, useRef, type JSX } from "react";
import ReactDOM from "react-dom";
import HTMLFlipBook from "react-pageflip";

interface Props {
  pages: JSX.Element[];
  onClose: () => void;
}

const FullScreenFlipbook: React.FC<Props> = ({ pages, onClose }) => {
  const bookRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/page-flip-4.mp3");
    audioRef.current.load();

    // Escape key closes flipbook
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore play errors (e.g. user hasn't interacted yet)
      });
    }
  };

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "#000000cc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    pointerEvents: "auto",
  };

  const pageStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
    padding: "60px 40px 40px 40px",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    background: "#fff",
  };

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10000,
    fontSize: 32,
    background: "#ffffffaa",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "auto",
  };

  return ReactDOM.createPortal(
    <div style={containerStyle}>
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: "absolute",
          top: 20,
          right: 30,
          padding: "10px 15px",
          fontSize: 16,
          background: "#fff",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
          zIndex: 10000,
        }}
        aria-label="Close Flipbook"
      >
        Close ✕
      </button>

      {/* Left Arrow */}
      <button
        onClick={() => {
          bookRef.current?.pageFlip().flipPrev();
          
        }}
        style={{ ...arrowStyle, left: 20 }}
        aria-label="Previous Page"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => {
          bookRef.current?.pageFlip().flipNext();
          
        }}
        style={{ ...arrowStyle, right: 20 }}
        aria-label="Next Page"
      >
        ›
      </button>

      <HTMLFlipBook
        ref={bookRef}
        width={1000}
        height={window.innerHeight - 80}
        size="stretch"
        minWidth={300}
        maxWidth={2000}
        minHeight={300}
        maxHeight={2000}
        showCover={true}
        mobileScrollSupport={true}
        usePortrait={false}
        drawShadow={true}
        flippingTime={800}
        startPage={0}
        disableFlipByClick={false}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        className="my-flipbook"
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={0.5}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100%",
          overflow: "visible",
        }}
        onFlip={playFlipSound} // Play sound when flip happens (e.g., drag, click corners)
      >
        {pages.map((page, i) => (
          <div key={i} style={pageStyle}>
            {page}
          </div>
        ))}
      </HTMLFlipBook>
    </div>,
    document.body
  );
};

export default FullScreenFlipbook;
