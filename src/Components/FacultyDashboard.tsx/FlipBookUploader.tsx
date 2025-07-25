import React, { useRef, useState, useEffect, type JSX } from "react";
import { Tab, Tabs, Button, Form } from "react-bootstrap";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import logoImageSrc from "../../assets/injex-bglogo.png";
import FullScreenFlipbook from "./FullScreenFlipbook";
import axios from "axios";
import { useParams } from "react-router-dom";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const FlipBookUploader: React.FC = () => {
  // Flipbook states
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<JSX.Element[]>([]);
  const [flipbookHours, setFlipbookHours] = useState("");
  const [flipbookMins, setFlipbookMins] = useState("");
  const flipbookInputRef = useRef<HTMLInputElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [flipbookFileName, setFlipbookFileName] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [showVideoSuccessModal, setShowVideoSuccessModal] = useState(false);
  const [uploadedVideoFileName, setUploadedVideoFileName] = useState("");
  const [intenseLevel, setIntenseLevel] = useState("");
  const [showFlipbookSuccessModal, setShowFlipbookSuccessModal] = useState(false);


  // Video states
  const videoInputRef = useRef<HTMLInputElement>(null);
  // const [uploadedVideos, setUploadedVideos] = useState<Array<{ url: string; name: string }>>([]);
  const [uploadedVideos, setUploadedVideos] = useState<
    { url: string; name: string; duration: number }[]
  >([]);

  const [videoHours, setVideoHours] = useState("0");
  const [videoMins, setVideoMins] = useState("0");
  const [videoSecs, setVideoSecs] = useState("0");

  const [uploadError, setUploadError] = useState("");

  const { lessonId } = useParams<{ lessonId: string }>(); // ✅ Extract from URL
  console.log("Received lessonId from URL:", lessonId);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setUploadedFileName(file.name); // ✅ set the file name
      renderPdfPages(url);
    } else {
      alert("Only PDF files are supported for flipbook preview.");
    }
  };

  const renderPdfPages = async (url: string) => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

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

      const topPadding = 60;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const logoWidth = 80;
      const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
      const topMargin = 2;
      context.drawImage(logoImage, 10, topMargin, logoWidth, logoHeight);

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

  // const handleSaveFlipbook = () => {
  //   console.log("Saving flipbook...", {
  //     fileUrl,
  //     hours: flipbookHours,
  //     mins: flipbookMins,
  //   });
  //   setShowSuccessModal(true);
  // };

  //   const handleSaveFlipbook = async () => {
  //   try {
  //     const totalMinutes =
  //       parseInt(flipbookHours || "0") * 60 + parseInt(flipbookMins || "0");

  //     const payload = {
  //       lessonId, // ✅ use the existing variable
  //       duration: totalMinutes,
  //       fileName: uploadedFileName,
  //     };

  //     console.log("Sending flipbook data to backend:", payload);

  //     const response = await axios.post(
  //       "http://localhost:3000/api/flipbook-duration", // 🔁 update if different
  //       payload
  //     );

  //     console.log("Flipbook duration saved:", response.data);
  //     setShowSuccessModal(true);
  //   } catch (error) {
  //     console.error("Error saving flipbook duration:", error);
  //   }
  // };

  const handleSaveFlipbook = async () => {
    try {
      const hours = parseInt(flipbookHours || "0");
      const minutes = parseInt(flipbookMins || "0");

      const payload = {
        lessonId,
        duration: {
          hours,
          minutes,
        },
        fileName: uploadedFileName,
      };

      console.log("🚀 Sending flipbook data to backend:", payload);

      const response = await axios.post(
        "http://localhost:3000/api/flipbook-duration",
        payload
      );

      console.log("✅ Flipbook duration saved:", response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("❌ Error saving flipbook duration:", error);
    }
     setShowFlipbookSuccessModal(true);
  };

  // const handleSaveFlipbook = async () => {
  //   try {
  //     const totalMinutes =
  //       parseInt(flipbookHours || "0") * 60 + parseInt(flipbookMins || "0");

  //     const payload = {
  //       lessonId,
  //       duration: totalMinutes,
  //       fileName: uploadedFileName,
  //     };

  //     console.log("🚀 Sending flipbook data to backend:", payload);

  //     // ✅ Simulate a delay like an API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // ✅ Simulate success response
  //     console.log("✅ Flipbook duration saved (mock)");

  //     setShowSuccessModal(true);
  //   } catch (error) {
  //     console.error("❌ Error saving flipbook duration (mock):", error);
  //   }
  // };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      const videoElement = document.createElement("video");

      videoElement.preload = "metadata";
      videoElement.src = url;

      videoElement.onloadedmetadata = () => {
        const durationInSeconds = Math.floor(videoElement.duration);

        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        setVideoHours(hours.toString());
        setVideoMins(minutes.toString());
        setVideoSecs(seconds.toString());

        setUploadedVideos((prev) => [
          ...prev,
          {
            url,
            name: file.name,
            duration: durationInSeconds,
          },
        ]);
      };
    });
  };

  const handleSaveVideos = () => {
    console.log("Saving videos...", {
      files: uploadedVideos,
      hours: videoHours,
      mins: videoMins,
    });
    // Set filename for the modal display
    setUploadedVideoFileName(uploadedVideos[0].name);

    // Show modal
    setShowVideoSuccessModal(true);
  };

  const handleRemoveVideo = (indexToRemove: number) => {
    setUploadedVideos((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const playVideoFullscreen = (videoUrl: string) => {
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.controls = true;
    videoElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: black;
      z-index: 9999;
      object-fit: contain;
    `;

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "×";
    closeBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0,0,0,0.7);
      color: white;
      border: none;
      font-size: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 10000;
    `;

    const cleanup = () => {
      if (document.body.contains(videoElement)) {
        videoElement.pause();
        document.body.removeChild(videoElement);
      }
      if (document.body.contains(closeBtn)) {
        document.body.removeChild(closeBtn);
      }
    };

    closeBtn.onclick = cleanup;
    videoElement.addEventListener("ended", cleanup);

    document.body.appendChild(videoElement);
    document.body.appendChild(closeBtn);
    videoElement.play().catch(console.error);
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
          height: "650px",
        }}
      >
        <Tabs defaultActiveKey="flipbook" className="mb-3">
          {showSuccessModal && (
            <div
              className="modal fade show d-block"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div
                  className="modal-content text-center p-4"
                  style={{
                    borderRadius: "16px",
                    width: "360px", // reduce modal width
                    margin: "0 auto",
                  }}
                >
                  <h5 className="mb-3 fw-semibold">Successfully Created</h5>

                  <div className="mb-3 d-flex align-items-center justify-content-center">
                    <i className="bi bi-journal-text fs-5 me-2"></i>
                    <a
                      href="#"
                      className="text-primary text-decoration-none"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Lesson : {uploadedFileName || "Flip book"}
                    </a>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-warning fw-bold"
                      style={{
                        minWidth: "80px",
                        padding: "6px 16px",
                        fontSize: "0.85rem",
                        color: "#000",
                      }}
                      onClick={() => setShowSuccessModal(false)}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  onClick={() => flipbookInputRef.current?.click()}
                >
                  <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    ref={flipbookInputRef}
                    hidden
                  />
                  <div className="text-muted small">Upload PDF / Word</div>
                  <small className="text-muted">Max: 20MB</small>
                </div>

                {/* ✅ Uploaded File Name Display */}
                {uploadedFileName && (
                  <div
                    className="text-truncate mb-2 text-muted text-center"
                    style={{
                      fontSize: "0.70rem",
                      padding: "6px 10px",
                      border: "1px solid #eee",
                      borderRadius: "6px",
                      background: "#f9f9f9",
                    }}
                  >
                    📄 Uploaded: <b>{uploadedFileName}</b>
                  </div>
                )}

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
                      value={flipbookHours}
                      onChange={(e) => setFlipbookHours(e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Mins"
                      style={{ fontSize: "0.85rem" }}
                      value={flipbookMins}
                      onChange={(e) => setFlipbookMins(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <Form.Label style={{ fontSize: "0.9rem" }}>
                    Intense Level
                  </Form.Label>
                  <Form.Select
                    style={{ fontSize: "0.85rem" }}
                    value={intenseLevel}
                    onChange={(e) => setIntenseLevel(e.target.value)}
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </Form.Select>
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
                  onClick={handleSaveFlipbook}
                >
                  Save
                </Button>
              </div>

              {/* Preview Section */}
              <div className="col-md-8 d-flex flex-column align-items-center">
                <div
                  className="w-100 p-4 rounded"
                  style={{
                    border: "1px solid #ddd",
                    backgroundColor: "#fafafa",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    height: "550px",
                  }}
                >
                  <div className="mb-2" style={{ fontSize: "0.9rem" }}>
                    Preview
                  </div>

                  {pdfPages.length > 0 ? (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        overflowX: "auto",
                        padding: "30px 10px 10px 10px",
                        position: "relative",
                      }}
                    >
                      {/* ✖️ Close Icon inside the Flipbook box */}
                      <button
                        onClick={() => {
                          setPdfPages([]); // or your logic to reset preview
                          setUploadedFileName("");
                        }}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "transparent",
                          border: "none",
                          color: "#333",
                          fontSize: "20px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          zIndex: 10,
                        }}
                      >
                        ×
                      </button>

                     

                      <div
                        onClick={() => setIsFullScreen(true)}
                        style={{ cursor: "pointer", width: "fit-content" }}
                      >
                        <HTMLFlipBook
                          width={1000}
                          height={800}
                          size="stretch"
                          minWidth={200}
                          maxWidth={600}
                          minHeight={200}
                          maxHeight={800}
                          showCover={true}
                          mobileScrollSupport={true}
                          flippingTime={600}
                          className="flip-book"
                          style={{ boxShadow: "0 0 5px rgba(0,0,0,0.2)" }}
                          startPage={0}
                          drawShadow={false}
                          usePortrait={false}
                          startZIndex={0}
                          autoSize={false}
                          maxShadowOpacity={0}
                          clickEventForward={false}
                          useMouseEvents={false}
                          swipeDistance={0}
                          showPageCorners={false}
                          disableFlipByClick={false}
                        >
                          {pdfPages}
                        </HTMLFlipBook>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted small">
                      No Flip Book Selected
                    </div>
                  )}
                </div>
              </div>
              {isFullScreen && (
                <FullScreenFlipbook
                  pages={pdfPages}
                  onClose={() => setIsFullScreen(false)}
                />
              )}
            </div>
          </Tab>

          <Tab eventKey="video" title="Video Files">
            <div className="video-files-content">
              <div className="video-upload-section">
                <h3>Upload Files</h3>

                <div
                  className="video-upload-zone"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p>Upload MP4, MPEG</p>
                  <small>Maximum upload size limit of 100 MB</small>
                  {uploadError && (
                    <div className="text-danger small mt-2">{uploadError}</div>
                  )}
                </div>

                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  ref={videoInputRef}
                  style={{ display: "none" }}
                  multiple
                />

                <div className="lesson-duration mt-4">
                  <h4>Lesson Duration</h4>
                  <div className="duration-inputs d-flex gap-4 text-center">
                    <div>
                      <Form.Control
                        type="number"
                        placeholder="Hours"
                        value={videoHours}
                        readOnly
                        style={{
                          width: "100px",
                          backgroundColor: "#f9f9f9",
                          cursor: "not-allowed",
                        }}
                      />
                      <div className="small mt-1">Hour</div>
                    </div>
                    <div>
                      <Form.Control
                        type="number"
                        placeholder="Mins"
                        value={videoMins}
                        readOnly
                        style={{
                          width: "100px",
                          backgroundColor: "#f9f9f9",
                          cursor: "not-allowed",
                        }}
                      />
                      <div className="small mt-1">Min</div>
                    </div>
                    <div>
                      <Form.Control
                        type="number"
                        placeholder="Secs"
                        value={videoSecs}
                        readOnly
                        style={{
                          width: "100px",
                          backgroundColor: "#f9f9f9",
                          cursor: "not-allowed",
                        }}
                      />
                      <div className="small mt-1">Sec</div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="warning"
                  className="mt-3"
                  onClick={handleSaveVideos}
                  disabled={uploadedVideos.length === 0}
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    padding: "8px 16px",
                  }}
                >
                  Save
                </Button>
              </div>
              <div className="video-preview-section mt-4">
                <h3>Preview</h3>
                <div className="video-preview-container">
                  {uploadedVideos.length > 0 ? (
                    <div className="uploaded-videos-list">
                      {uploadedVideos.map((video, index) => {
                        const hours = Math.floor(video.duration / 3600);
                        const minutes = Math.floor(
                          (video.duration % 3600) / 60
                        );
                        const seconds = video.duration % 60;

                        return (
                         <div
  key={index}
  className="video-preview-item mb-4 text-center"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
  }}
>
  {/* 🟨 Wrap button + video in this container */}
  <div
    style={{
      position: "relative", // KEY TO OVERLAYING THE CLOSE BUTTON
      width: "100%",
      height: "200px",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#000",
    }}
  >
    {/* ❌ Close Button ABOVE video */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleRemoveVideo(index);
      }}
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        background: "rgba(0, 0, 0, 0.6)", // gives contrast above video
        border: "none",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
        cursor: "pointer",
        padding: "4px 8px",
        borderRadius: "4px",
        zIndex: 2,
      }}
      aria-label="Remove video"
      title="Remove"
    >
      ×
    </button>

    {/* 🎬 Video Player */}
    <video
      className="preview-video-player"
      controls
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    >
      <source src={video.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* 🔎 Overlay to enable full screen click */}
    <div
      onClick={() => playVideoFullscreen(video.url)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        cursor: "pointer",
        zIndex: 1,
      }}
    />
  </div>

  {/* ℹ️ Video Info */}
  <div className="video-info mt-2 text-center">
    <div className="video-name fw-semibold">{video.name}</div>
    <div className="video-duration text-muted small">
      Duration: {hours}h {minutes}m {seconds}s
    </div>
  </div>
</div>

                        );
                      })}
                    </div>
                  ) : (
                    <div className="video-placeholder text-center py-4">
                      <div className="placeholder-image">
                        <svg
                          width="100"
                          height="100"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <rect
                            x="2"
                            y="3"
                            width="20"
                            height="14"
                            rx="2"
                            ry="2"
                          />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <p className="mt-2">No video uploaded</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Tab>

          {showVideoSuccessModal && (
            <div
              className="modal fade show d-block"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1050,
              }}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                style={{ zIndex: 1060 }}
              >
                <div
                  className="modal-content text-center px-4 py-3"
                  style={{
                    borderRadius: "16px",
                    maxWidth: "400px",
                    margin: "0 auto",
                  }}
                >
                  <h5 className="mb-3 fw-semibold">Successfully Created</h5>

                  <div className="mb-3 d-flex align-items-center justify-content-center">
                    <i className="bi bi-journal-text fs-4"></i>
                    <span
                      className="ms-2 text-primary text-decoration-none"
                      style={{ fontSize: "0.50rem" }}
                    >
                      Lesson : {uploadedVideoFileName || "Video Lesson"}
                    </span>
                  </div>

                  {/* ✅ Button Centered with reduced width */}
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-warning fw-bold"
                      style={{
                        padding: "6px 30px", // reduced width via padding
                        fontSize: "0.85rem",
                      }}
                      onClick={() => setShowVideoSuccessModal(false)}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showFlipbookSuccessModal && (
  <div
    className="modal fade show d-block"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 1050,
    }}
  >
    <div
      className="modal-dialog modal-dialog-centered"
      style={{ zIndex: 1060 }}
    >
      <div
        className="modal-content text-center px-4 py-3"
        style={{
          borderRadius: "16px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h5 className="mb-3 fw-semibold">Successfully Created</h5>

        <div className="mb-3 d-flex align-items-center justify-content-center">
          <i className="bi bi-journal-text fs-4"></i>
          <span
            className="ms-2 text-primary text-decoration-none"
            style={{ fontSize: "0.50rem" }}
          >
            Lesson: {uploadedFileName || "Flipbook Lesson"}
          </span>
        </div>

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-warning fw-bold"
            style={{
              padding: "6px 30px",
              fontSize: "0.85rem",
            }}
            onClick={() => setShowFlipbookSuccessModal(false)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        </Tabs>
      </div>
    </div>
  );
};

export default FlipBookUploader;
