'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { setupPdfWorker } from '../utils/pdfjs-worker';

const PDF = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);

  // Configure PDF.js worker
  useEffect(() => {
    // This needs to be done in useEffect to avoid SSR issues
    setupPdfWorker();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please select a valid PDF file');
      return;
    }
    setPdfFile(file);
    setPageNumber(1);
  };

  // Navigation functions
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prevPageNum => prevPageNum - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(prevPageNum => prevPageNum + 1);
    }
  };

  // Zoom functions
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };

  // Handle document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-viewer">
      <div className="pdf-header">
        <h2>PDF Viewer</h2>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="file-input"
        />
      </div>

      {pdfFile && (
        <div className="controls-container">
          <div className="page-controls">
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Previous
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
              Next
            </button>
          </div>

          <div className="zoom-controls">
            <button onClick={zoomOut}>Zoom Out</button>
            <span>{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn}>Zoom In</button>
          </div>
        </div>
      )}

      <div className="pdf-container">
        {pdfFile ? (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>Loading PDF...</div>}
            error={<div>Failed to load PDF!</div>}
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        ) : (
          <div className="placeholder">Select a PDF file to view</div>
        )}
      </div>
    </div>
  );
};

export default PDF;