import React, { useRef, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

interface VideoFile {
  url: string;
  name: string;
}

interface VideoFilesComponentProps {
  onSave?: (data: {
    files: VideoFile[];
    hours: string;
    mins: string;
  }) => void;
}

const VideoFilesComponent: React.FC<VideoFilesComponentProps> = ({ onSave }) => {
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [uploadedVideos, setUploadedVideos] = useState<VideoFile[]>([]);
  const [hours, setHours] = useState("");
  const [mins, setMins] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newVideos: VideoFile[] = [];
    let hasError = false;

    Array.from(files).forEach((file) => {
      // Check file type
      if (!file.type.startsWith("video/") && !file.name.toLowerCase().match(/\.(mp4|mpeg|mov|avi|webm)$/)) {
        setUploadError("Only video files (MP4, MPEG, MOV, AVI, WEBM) are supported");
        hasError = true;
        return;
      }

      // Check file size (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        setUploadError("File size exceeds 100MB limit");
        hasError = true;
        return;
      }

      const url = URL.createObjectURL(file);
      newVideos.push({
        url,
        name: file.name,
      });
    });

    if (!hasError) {
      setUploadError("");
      setUploadedVideos((prev) => [...prev, ...newVideos]);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        files: uploadedVideos,
        hours,
        mins,
      });
    }
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
          <div className="duration-inputs d-flex gap-2">
            <Form.Control
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              style={{ width: "100px" }}
            />
            <Form.Control
              type="number"
              placeholder="Mins"
              value={mins}
              onChange={(e) => setMins(e.target.value)}
              style={{ width: "100px" }}
            />
          </div>
        </div>

        <Button
          variant="warning"
          className="mt-3"
          onClick={handleSave}
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
              {uploadedVideos.map((video, index) => (
                <div key={index} className="video-preview-item mb-3">
                  <video
                    className="preview-video-player"
                    controls
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      backgroundColor: "#000",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => playVideoFullscreen(video.url)}
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-info mt-2">
                    <div className="video-name text-truncate">{video.name}</div>
                    <div className="video-duration text-muted small">
                      Duration: {hours || "0"}h {mins || "0"}m
                    </div>
                  </div>
                </div>
              ))}
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
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
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
  );
};

export default VideoFilesComponent;