import React, { useRef, useState, useEffect, type JSX } from "react";
import { Tab, Tabs, Button, Form } from "react-bootstrap";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import logoImageSrc from "../assets/injex-bglogo.png";
import FullScreenFlipbook from "./FullScreenFlipbook";


pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const FlipBookUploader: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<JSX.Element[]>([]);
  const [hours, setHours] = useState("");
  const [mins, setMins] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      renderPdfPages(url);
    } else {
      alert("Only PDF files are supported for flipbook preview.");
    }
  };

  const renderPdfPages = async (url: string) => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    // Load logo image from imported source
    const loadLogo = (): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = logoImageSrc;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });

    const logoImage = await loadLogo();

    const pagePromises = Array.from({ length: numPages }, async (_, index) => {
      const page = await pdf.getPage(index + 1);
      const viewport = page.getViewport({ scale: 4 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
     canvas.height = viewport.height;
canvas.width = viewport.width;



      // Render PDF page
      await page.render({ canvasContext: context, viewport }).promise;

      // Draw logo top-left with minimal vertical space
      const logoWidth = 80;
      const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
      const topMargin = 1; // shrink vertical spacing
      context.drawImage(logoImage, 10, topMargin, logoWidth, logoHeight);

      // Page number at the bottom
      context.font = "16px Arial";
      context.fillStyle = "#333";
      context.textAlign = "center";
      context.fillText(
        `Page ${index + 1} of ${numPages}`,
        canvas.width / 2,
        canvas.height - 20
      );

      return (
        <div className="page" key={`page-${index}`}>
          <img
            src={canvas.toDataURL()}
            alt={`Page ${index + 1}`}
            style={{
        width: "100%",
        height: "auto",
        objectFit: "contain",
        padding: "10px",
        boxSizing: "border-box",
      }}
          />
        </div>
      );
    });

    const pages = await Promise.all(pagePromises);
    setPdfPages(pages);
  };

  const handleSave = () => {
    console.log("Saving...", { fileUrl, hours, mins });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <div
        className="rounded p-3"
        style={{
          background: "white",
          width: "820px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Tabs defaultActiveKey="flipbook" className="mb-3">
          <Tab eventKey="flipbook" title="Flip Book">
            <div className="row">
              {/* Upload Section */}
              <div className="col-md-4">
                <div
                  className="d-flex flex-column align-items-center justify-content-center p-3 mb-3"
                  style={{
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    height: "140px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    hidden
                  />
                  <div className="text-muted small">Upload PDF / Word</div>
                  <small className="text-muted">Max: 20MB</small>
                </div>

                {/* Lesson Duration */}
                <div className="mb-2">
                  <Form.Label style={{ fontSize: "0.9rem" }}>
                    Lesson Duration
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="number"
                      placeholder="Hrs"
                      className="me-2"
                      style={{ fontSize: "0.85rem" }}
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Mins"
                      style={{ fontSize: "0.85rem" }}
                      value={mins}
                      onChange={(e) => setMins(e.target.value)}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  variant="warning"
                  className="w-100 fw-bold"
                  style={{
                    color: "black",
                    fontSize: "0.85rem",
                    padding: "6px 12px",
                  }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>

              {/* Preview Section */}
              {/* Preview Section */}
              <div className="col-md-8 d-flex flex-column align-items-center">
                <div className="mb-2" style={{ fontSize: "0.9rem" }}>
                  Preview
                </div>
                {pdfPages.length > 0 ? (
                  <div
                    onClick={() => setIsFullScreen(true)}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      overflowX: "auto",
                      padding: "10px",
                    }}
                  >
                    <HTMLFlipBook
                      width={600}
                      height={600}
                      size="stretch"
                      minWidth={100}
                       
                      maxWidth={600}
                      minHeight={150}
                      maxHeight={800}
                      showCover={true}
                      mobileScrollSupport={true}
                      flippingTime={600} // Valid flipping time
                      className="flip-book"
                      style={{ boxShadow: "0 0 5px rgba(0,0,0,0.2)" }}
                      startPage={0}
                      drawShadow={true}
                      usePortrait={true}
                      autoSize={true}
                      maxShadowOpacity={0.5}
                      disableFlipByClick={false}
                      startZIndex={0}
                      clickEventForward={false}
                      useMouseEvents={true}
                      swipeDistance={30} // > 0 to enable swipe
                      showPageCorners={false}
                    >
                      {pdfPages}
                    </HTMLFlipBook>
                    {isFullScreen && (
                      <FullScreenFlipbook
                        pages={pdfPages}
                        onClose={() => setIsFullScreen(false)}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-muted small">No Flip Book Selected</div>
                )}
              </div>
            </div>
          </Tab>
          <Tab eventKey="video" title="Video Files">
            <div className="text-center text-muted p-3 small">
              Video upload coming soon...
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default FlipBookUploader;
