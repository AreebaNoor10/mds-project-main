'use client'
import { Box, Typography, Button, Paper, TextField, Stepper, Step, StepLabel, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import StepIcon from '@mui/material/StepIcon';
import LoopIcon from '@mui/icons-material/Loop';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DescriptionIcon from '@mui/icons-material/Description';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Dashboard() {
  const [addmtr, setaddMtr] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showUploadError, setShowUploadError] = useState(false);
  const uploadInputRef = useRef();
  const [mdsName, setMdsName] = useState('');
  const [mdsNameError, setMdsNameError] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [materialType, setMaterialType] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [showApiError, setShowApiError] = useState(true);
  
  const fileData = [
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2023-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
    { filename: 'test-cert1.pdf', type: 'PDF', metadata: 'Copper C11000, ASTM B152', date: '2023-05-01', status: 'draft' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2023-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2023-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
    { filename: 'test-cert1.pdf', type: 'PDF', metadata: 'Copper C11000, ASTM B152', date: '2023-05-01', status: 'draft' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2023-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2023-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
    { filename: 'test-cert1.pdf', type: 'PDF', metadata: 'Copper C11000, ASTM B152', date: '2023-05-01', status: 'draft' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2023-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2023-05-02', status: 'completed' },
  ];

  // Calculate total pages
  const totalItems = fileData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Get current page items
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = fileData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show pages 1, 2, 3
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis if needed
    if (totalPages > 3) {
      pageNumbers.push('...');
      
      // Add some pages near the end
      if (totalPages > 5) {
        pageNumbers.push(67);
        pageNumbers.push(68);
      } else {
        // Add remaining pages for small total page counts
        for (let i = 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };

  const steps = [
    'Upload file',
    'Grade Detection',
    'MTR Data',
    'Unified Spec',
    'Comparison Agents',
    'Quality Check AI',
    'QA Review',
  ];
  
  const stats = [
    { title: 'Draft', count: '2', icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} /> },
    { title: 'Pending', count: '5', icon: <AccessTimeIcon sx={{ fontSize: 20 }} /> },
    { title: 'Completed', count: '109', icon: <CheckCircleOutlineIcon sx={{ fontSize: 20 }} /> },
  ];

  // Helper to get visible steps for mobile
  const getVisibleSteps = () => {
    if (window.innerWidth >= 600) return steps.map((label, idx) => ({ label, idx })); // show all on desktop
    if (activeStep <= 1) return steps.slice(0, 4).map((label, idx) => ({ label, idx }));
    if (activeStep >= steps.length - 2) return steps.slice(-4).map((label, idx) => ({ label, idx: steps.length - 4 + idx }));
    return steps.slice(activeStep - 1, activeStep + 3).map((label, idx) => ({ label, idx: activeStep - 1 + idx }));
  };

  useEffect(() => {
    if (apiResponse && apiResponse.error) {
      setShowApiError(true);
    }
  }, [apiResponse && apiResponse.error]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      p: { xs: 2, sm: 3 }
    }}>
      {addmtr === false ? (
          <>
          {/* Stats Cards */}
          <Box sx={{ 
            display: 'flex', 
            width: '100%', 
            mb: 3, 
            gap: { xs: 2, sm: 3 }
          }}>
            {stats.map((stat, index) => (
              <Box 
                key={index}
                sx={{ 
                  flex: 1, 
                  p: { xs: 2, sm: 3 }, 
                  display: 'flex',
                  bgcolor: 'white',
                  borderRight: { 
                    xs: 'none', 
                    sm: index < stats.length - 1 ? '1px solid #f0f0f0' : 'none' 
                  },
                  mr: { 
                    xs: 0, 
                    sm: index < stats.length - 1 ? 3 : 0 
                  },
                  boxShadow: { xs: '0 1px 3px rgba(0,0,0,0.1)', sm: 'none' },
                  borderRadius: '10px'
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  width: '100%' 
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    mb: 1.5
                  }}>
                    <Typography sx={{ 
                      color: '#5f6368', 
                      fontSize: '14px', 
                      fontWeight: 400
                    }}>
                      {stat.title}
                    </Typography>
                    <Box sx={{ 
                      color: index === 0 ? '#5f6368' : index === 1 ? '#5f6368' : '#34a853',
                      mr: -0.5
                    }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Typography 
                    sx={{ 
                      fontSize: { xs: '24px', sm: '28px' }, 
                      fontWeight: 'bold',
                      color: '#202124',
                      lineHeight: 1
                    }}
                  >
                    {stat.count}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
    
          {/* MTR Review History */}
          <Box sx={{ 
            mb: 2, 
            display: 'flex', 
            flexDirection: 'row' ,
            justifyContent: 'space-between', 
            alignItems:  'center' ,
          }}>
            <Typography
              sx={{ fontSize: '16px', fontWeight: 700}}
            >
              MTR Review History
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setaddMtr(true)}
              sx={{
                bgcolor: '#4285f4',
                '&:hover': {
                  bgcolor: '#1a73e8',
                },
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
                px: 2,
                py: 1,
                borderRadius: '10px'
              }}
            >
              Add MTR
            </Button>
          </Box>
          
          <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
    }}>
      {/* Table Container */}
      <div className="w-full rounded-lg bg-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">File name</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Metadata</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Upload date</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 text-center text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentItems.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-4 px-6 text-sm text-gray-800 whitespace-nowrap">{row.filename}</td>
                  <td className="py-4 px-6 text-sm text-gray-800 whitespace-nowrap">{row.type}</td>
                  <td className="py-4 px-6 text-sm text-gray-800 whitespace-nowrap">{row.metadata}</td>
                  <td className="py-4 px-6 text-sm text-gray-800 whitespace-nowrap">{row.date}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {row.status === 'completed' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300 whitespace-nowrap">
                        ✅ Completed
                      </span>
                    )}
                    {row.status === 'processing' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-300 whitespace-nowrap">
                        ⏳ Processing
                      </span>
                    )}
                    {row.status === 'draft' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300 whitespace-nowrap">
                        📝 Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="text-gray-500 hover:text-blue-600">
                      <RemoveRedEyeOutlinedIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mt: 2,
        px: 1
      }}>
        <Typography variant="body2" color="text.secondary">
          Show {Math.min(currentItems.length, itemsPerPage)} out of {totalItems}
        </Typography>
        
        <div className="flex items-center gap-1">
          {/* Previous button */}
          <button 
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 1}
            className="flex items-center justify-center h-6 w-6 rounded text-gray-600 bg-white hover:bg-gray-100"
          >
            <NavigateBeforeIcon sx={{ fontSize: 18 }} />
          </button>
          
          {/* Page numbers */}
          {getPageNumbers().map((pageNum, index) => (
            <button 
              key={index}
              onClick={() => typeof pageNum === 'number' ? handleChangePage(pageNum) : null}
              className={`flex items-center justify-center h-6 w-6 text-xs rounded-sm ${
                pageNum === page 
                  ? 'bg-gray-800 text-white' 
                  : pageNum === '...' 
                    ? 'bg-transparent text-gray-600 cursor-default' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          ))}
          
          {/* Next button */}
          <button 
            onClick={() => handleChangePage(page + 1)}
            disabled={page === totalPages}
            className="flex items-center justify-center h-6 w-6 rounded text-gray-600 bg-white hover:bg-gray-100"
          >
            <NavigateNextIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </Box>
    </Box>
          </> 
        ) : (
          <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto'}}>
            {/* Custom Stepper */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 1,
              mt: 0.5,
              overflow: { xs: 'hidden', sm: 'visible' },
              position: 'relative',
              width: '100%'
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                width: '100%',
                transition: 'transform 0.3s ease-in-out'
              }}>
                {(typeof window !== 'undefined' && window.innerWidth < 600 ? getVisibleSteps() : steps.map((label, idx) => ({ label, idx }))).map(({ label, idx }, visibleIdx) => {
                  const isActive = idx === activeStep;
                  const isCompleted = idx < activeStep;
                  const isLoading = loading && idx === activeStep + 1;
                  return (
                    <Box key={`${label}-${idx}`} sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      flex: { xs: '0 0 20%', sm: '0 1 auto' },
                      minWidth: { xs: '20%', sm: 'auto' },
                      px: { xs: 0.2, sm: 0.5 }
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <Box
                          sx={{
                            width: { xs: 24, sm: 32 },
                            height: { xs: 24, sm: 32 },
                            borderRadius: '50%',
                            bgcolor: isActive ? '#e58900' : isCompleted ? '#34a853' : '#f5f5f5',
                            color: isActive || isCompleted ? '#fff' : '#bdbdbd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 0.3,
                            border: isActive ? '2px solid #e58900' : '2px solid #f5f5f5',
                            transition: 'all 0.2s',
                            fontSize: { xs: 13, sm: 17 },
                            fontWeight: 600,
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircleOutlineIcon sx={{ color: '#fff', fontSize: { xs: 16, sm: 20 } }} />
                          ) : isLoading ? (
                            <LoopIcon sx={{ color: '#e58900', fontSize: { xs: 16, sm: 20 }, animation: 'spin 1s linear infinite' }} />
                          ) : isActive ? (
                            <DescriptionIcon sx={{ color: '#fff', fontSize: { xs: 16, sm: 20 } }} />
                          ) : (
                            idx + 1
                          )}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 10, sm: 12 },
                            color: isActive ? '#222' : '#bdbdbd',
                            fontWeight: isActive ? 600 : 400,
                            textAlign: 'center',
                            lineHeight: 1.15,
                            whiteSpace: 'normal',
                            overflow: 'visible',
                            textOverflow: 'unset',
                            px: 0.5,
                          }}
                        >
                          {label}
                        </Typography>
                      </Box>
                      {visibleIdx < (typeof window !== 'undefined' && window.innerWidth < 600 ? 3 : steps.length - 1) && (
                        <Box sx={{ 
                          width: { xs: 10, sm: 24 },
                          height: 2, 
                          bgcolor: '#f0f0f0', 
                          mx: { xs: 0.2, sm: 0.5 },
                          mt: { xs: 8, sm: 10 }
                        }} />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Loading Card (centered) */}
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 350,
                  width: '100%',
                  mt: 6,
                  mb: 6,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: '#fff',
                    minWidth: 320,
                    maxWidth: 400,
                    mx: 'auto',
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress sx={{ color: '#222', mb: 2 }} />
                  {activeStep === 0 && (
                    <>
                      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1 }}>
                        Extracted Text
                      </Typography>
                      <Typography sx={{ fontSize: 15, color: '#444', opacity: 0.8, textAlign: 'center', maxWidth: 350 }}>
                        Extracted text by Supervisor Agent (AI) to give us Material Type/Grade Detection
                      </Typography>
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1 }}>
                        Data Extraction(MTR Data Extraction)
                      </Typography>
                      <Typography sx={{ fontSize: 15, color: '#444', opacity: 0.8, textAlign: 'center', maxWidth: 350 }}>
                        Extracted text has been passed to Agent to Extract Key Fields for 4140 Grade, Heat No., Composition, etc.
                      </Typography>
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1 }}>
                        Run RAG AI Agent
                      </Typography>
                      <Typography sx={{ fontSize: 15, color: '#444', opacity: 0.8, textAlign: 'center', maxWidth: 350 }}>
                        By using extracted data to show Best matched Unified Spec file
                      </Typography>
                    </>
                  )}
                  {activeStep === 3 && (
                    <>
                      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1 }}>
                        OpenAI / Anthropic Agents
                      </Typography>
                      <Typography sx={{ fontSize: 15, color: '#444', opacity: 0.8, textAlign: 'center', maxWidth: 350 }}>
                        By giving Material data + Unified spec we can get Comparison Table
                      </Typography>
                    </>
                  )}
                  {activeStep === 4 && (
                    <>
                      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1 }}>
                        Final Quality AI Checking
                      </Typography>
                      <Typography sx={{ fontSize: 15, color: '#444', opacity: 0.8, textAlign: 'center', maxWidth: 350 }}>
                        Quality Check Agent by Combined comparison table, Modal preview: Material Cert, Unified Spec
                      </Typography>
                    </>
                  )}
                  {activeStep === 5 && (
                    <>
                      <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1 }}>
                        Final QA Review
                      </Typography>
                      <Typography sx={{ fontSize: 15, color: '#444', opacity: 0.8, textAlign: 'center', maxWidth: 350 }}>
                        Final report overview with previous step output used by QA Agent
                      </Typography>
                    </>
                  )}
                </Paper>
              </Box>
            )}

            {/* Step Content and Buttons (hide when loading) */}
            {!loading && (
              <>
                {/* Step 1: Upload UI */}
                {activeStep === 0 && (
                  <Box
                    sx={{
                      mt: 4,
                      mb: 4,
                      width: '100%',
                      maxWidth: 600,
                      minHeight: 180,
                      bgcolor: '#fff6e6',
                      border: '2px dashed #e58900',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'border 0.2s',
                      mx: 'auto',
                      '&:hover': { borderColor: '#b36b00' },
                      position: 'relative'
                    }}
                    onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                  >
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      style={{ display: 'none' }}
                      ref={uploadInputRef}
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0]);
                          setShowUploadError(false);
                        }
                      }}
                    />
                    {!uploadedFile ? (
                      <>
                        <UploadFileIcon sx={{ fontSize: 40, color: '#222', mb: 1 }} />
                        <Box sx={{ fontWeight: 500, fontSize: 18, color: '#222', mb: 0.5 }}>
                          Click to upload or drag and drop
                        </Box>
                        <Box sx={{ fontSize: 15, color: '#444', opacity: 0.8 }}>
                          Upload PDF or Scanned image to proceed!
                        </Box>
                      </>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%',
                          minHeight: 120,
                        }}
                      >
                        {uploadedFile.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(uploadedFile)}
                            alt={uploadedFile.name}
                            style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                          />
                        ) : (
                          <PictureAsPdfIcon sx={{ color: '#d32f2f', fontSize: 48, mb: 1 }} />
                        )}
                        <Typography sx={{ fontSize: 15, fontWeight: 500, color: '#222', textAlign: 'center', mt: 1 }}>
                          {uploadedFile.name}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: '#888', textAlign: 'center' }}>
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
                {/* MDS Name input for step 1 */}
                {activeStep === 0 && (
                  <Box sx={{ mt: 2, width: '100%', maxWidth: 400, mx: 'auto' }}>
                    <TextField
                      label="MDS Name *"
                      value={mdsName}
                      onChange={e => {
                        setMdsName(e.target.value);
                        setMdsNameError(false);
                      }}
                      error={mdsNameError}
                      helperText={mdsNameError ? 'MDS Name is required' : ''}
                      fullWidth
                      required
                    />
                  </Box>
                )}
                {/* Step 2: Grade Detection UI */}
                {activeStep === 1 && (
                  <Paper elevation={0} sx={{
                    p: 3,
                    mb: 4,
                    bgcolor: '#f8f9fb',
                    borderRadius: 2,
                    maxWidth: 600,
                    mx: 'auto',
                  }}>
                    {apiResponse && apiResponse.error && showApiError && (
                      <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setShowApiError(false)}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        {apiResponse.error}
                      </Alert>
                    )}
                    <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 3 }}>
                      Review and Confirm the Material Details
                    </Typography>
                    
                    {apiResponse && (
                      <>
                        <Box sx={{ mb: 2 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                            Type
                          </Typography>
                          <TextField
                            select
                            fullWidth
                            size="small"
                            value={typeValue}
                            onChange={e => setTypeValue(e.target.value)}
                            sx={{
                              bgcolor: '#fff',
                              borderRadius: 1,
                              '& .MuiOutlinedInput-root': {
                                height: 36
                              }
                            }}
                          >
                            {['4140', '4142', '4130','4145','41XX-95 KSI','4130 MOD -T95','4140- HEAT TREAT SPEC', 'API 5CT','L80 -1% Cr', 'L80 type 1','T-95, API 5CT'].map(option => (
                              <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                          </TextField>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                            Strength
                          </Typography>
                          <TextField
                            select
                            fullWidth
                            size="small"
                            value={apiResponse.decision?.strength || ''}
                            onChange={(e) => {
                              setApiResponse({
                                ...apiResponse,
                                decision: {
                                  ...apiResponse.decision,
                                  strength: e.target.value
                                }
                              });
                            }}
                            sx={{ 
                              bgcolor: '#fff', 
                              borderRadius: 1,
                              '& .MuiOutlinedInput-root': {
                                height: 36
                              }
                            }}
                          >
                            {['80', '95', '110', '125', '145'].map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                            Heat Number
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            value={apiResponse.decision?.heat_number || ''}
                            onChange={(e) => {
                              setApiResponse({
                                ...apiResponse,
                                decision: {
                                  ...apiResponse.decision,
                                  heat_number: e.target.value
                                }
                              });
                            }}
                            sx={{ 
                              bgcolor: '#fff', 
                              borderRadius: 1,
                              '& .MuiOutlinedInput-root': {
                                height: 36
                              }
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                            Lot Number
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            value={apiResponse.decision?.lot_number || ''}
                            onChange={(e) => {
                              setApiResponse({
                                ...apiResponse,
                                decision: {
                                  ...apiResponse.decision,
                                  lot_number: e.target.value
                                }
                              });
                            }}
                            sx={{ 
                              bgcolor: '#fff', 
                              borderRadius: 1,
                              '& .MuiOutlinedInput-root': {
                                height: 36
                              }
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                            Raw Material Size
                          </Typography>
                          <TextField
                            fullWidth
                            size="small"
                            value={apiResponse.decision?.raw_material_size || ''}
                            onChange={(e) => {
                              setApiResponse({
                                ...apiResponse,
                                decision: {
                                  ...apiResponse.decision,
                                  raw_material_size: e.target.value
                                }
                              });
                            }}
                            sx={{ 
                              bgcolor: '#fff', 
                              borderRadius: 1,
                              '& .MuiOutlinedInput-root': {
                                height: 36
                              }
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                            MDS Name
                          </Typography>
                          <TextField
                            select
                            fullWidth
                            size="small"
                            value={mdsName}
                            onChange={(e) => {
                              setMdsName(e.target.value);
                            }}
                            sx={{ 
                              bgcolor: '#fff', 
                              borderRadius: 1,
                              '& .MuiOutlinedInput-root': {
                                height: 36
                              }
                            }}
                          >
                            {['MDS-1', 'MDS-3', 'MDS-4', 'MDS-6', 'MDS-7', 'MDS-8', 'MDS-119', 'MDS-170', 'MDS-172', 'MDS-201', 'MDS-204'].map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      </>
                    )}
                  </Paper>
                )}
                {/* Step 3: MTR Data Table UI */}
                {activeStep === 2 && (
                  <Paper elevation={0} sx={{
                    p: 3,
                    mb: 4,
                    bgcolor: '#f8f9fb',
                    borderRadius: 2,
                    maxWidth: 1000,
                    mx: 'auto',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                          Material Certificate Details
                        </Typography>
                      </Box>
                      <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontWeight: 500, fontSize: 14, px: 2, py: 0.5, textTransform: 'none', bgcolor: '#fff', borderColor: '#e0e0e0', color: '#222', '&:hover': { bgcolor: '#f5f5f5', borderColor: '#bdbdbd' } }}>
                        Data Mode
                      </Button>
                    </Box>
                    <Box sx={{ overflowX: 'auto' }}>
                      {apiResponse && apiResponse.error ? (
                        <Alert 
                          severity="error" 
                          sx={{ 
                            mb: 2,
                            '& .MuiAlert-message': {
                              fontSize: '14px'
                            }
                          }}
                        >
                          {apiResponse.error}
                        </Alert>
                      ) : apiResponse ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden' }}>
                          <thead style={{ background: '#f3f4f6' }}>
                            <tr>
                              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444', width: '50%' }}>Field</th>
                              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444', width: '50%' }}>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(apiResponse).map(([category, data]) => (
                              <React.Fragment key={category}>
                                {Object.entries(data).map(([key, value]) => {
                                  // Handle different types of values
                                  let displayValue = '';
                                  if (value === null || value === undefined) {
                                    displayValue = '';
                                  } else if (typeof value === 'object') {
                                    displayValue = JSON.stringify(value);
                                  } else {
                                    displayValue = value.toString();
                                  }
                                  
                                  return (
                                    <tr key={`${category}-${key}`} className="border-t border-gray-200">
                                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#444', width: '50%' }}>
                                        {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                      </td>
                                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#444', width: '50%' }}>
                                        {displayValue}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <Alert 
                          severity="error" 
                          sx={{ 
                            mb: 2,
                            '& .MuiAlert-message': {
                              fontSize: '14px'
                            }
                          }}
                        >
                          No data available. Please try again.
                        </Alert>
                      )}
                    </Box>
                  </Paper>
                )}
                {/* Step 4: Unified Spec Matching Table UI */}
                {activeStep === 3 && (
                  <Paper elevation={0} sx={{
                    p: 3,
                    mb: 4,
                    bgcolor: '#f8f9fb',
                    borderRadius: 2,
                    maxWidth: 1000,
                    mx: 'auto',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                        Unified Spec Matching
                      </Typography>
                      <TextField
                        select
                        size="small"
                        value="PDF Mode"
                        sx={{ minWidth: 120, bgcolor: '#fff', borderRadius: 1 }}
                        SelectProps={{ native: true }}
                      >
                        <option value="PDF Mode">PDF Mode</option>
                        <option value="Text Mode">Text Mode</option>
                      </TextField>
                    </Box>
                    
                    {apiResponse && apiResponse.error ? (
                      <Alert 
                        severity="error" 
                        sx={{ 
                          mb: 2,
                          '& .MuiAlert-message': {
                            fontSize: '14px'
                          }
                        }}
                      >
                        {apiResponse.error}
                      </Alert>
                    ) : apiResponse ? (
                      Object.entries(apiResponse).map(([specId, specData]) => {
                        // Flatten the nested response object for table rows
                        const response = specData.response || {};
                        const rows = [];
                        Object.entries(response).forEach(([parentKey, value]) => {
                          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                            Object.entries(value).forEach(([childKey, childValue]) => {
                              rows.push({
                                field: `${parentKey}.${childKey}`,
                                value: childValue
                              });
                            });
                          } else {
                            rows.push({
                              field: parentKey,
                              value: value
                            });
                          }
                        });
                        return (
                          <Box key={specId} sx={{ mb: 4 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 2, color: '#222' }}>
                              Specification ID: {specId}
                            </Typography>
                            <Box sx={{ overflowX: 'auto' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden' }}>
                                <thead style={{ background: '#f3f4f6' }}>
                                  <tr>
                                    <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444', width: '50%' }}>Field</th>
                                    <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444', width: '50%' }}>Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {rows.map(({ field, value }) => (
                                    <tr key={field} className="border-t border-gray-200">
                                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#444', width: '50%' }}>
                                        {field.split('.').pop().replace(/_/g, ' ')}
                                      </td>
                                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#444', width: '50%' }}>
                                        {value === null || value === undefined ? '' : value.toString()}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </Box>
                          </Box>
                        );
                      })
                    ) : (
                      <Alert 
                        severity="error" 
                        sx={{ 
                          mb: 2,
                          '& .MuiAlert-message': {
                            fontSize: '14px'
                          }
                        }}
                      >
                        No data available. Please try again.
                      </Alert>
                    )}
                  </Paper>
                )}
                {/* Step 5: Comparison Agents Table UI */}
                {activeStep === 4 && (
                  <Paper elevation={0} sx={{
                    p: 3,
                    mb: 4,
                    bgcolor: '#f8f9fb',
                    borderRadius: 2,
                    maxWidth: 1100,
                    mx: 'auto',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                        Comparison Agents
                      </Typography>
                      <TextField
                        select
                        size="small"
                        value="Export as"
                        sx={{ minWidth: 120, bgcolor: '#fff', borderRadius: 1 }}
                        SelectProps={{ native: true }}
                      >
                        <option value="Export as">Export as</option>
                        <option value="PDF">PDF</option>
                        <option value="Excel">Excel</option>
                      </TextField>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      <Button variant="contained" sx={{ bgcolor: '#4285f4', color: '#fff', fontWeight: 600, textTransform: 'none', borderRadius: 2, px: 3, py: 1, fontSize: 15, boxShadow: 'none', '&:hover': { bgcolor: '#1a73e8' } }}>Open AI Agent</Button>
                      <Button variant="outlined" sx={{ color: '#222', borderColor: '#e0e0e0', fontWeight: 600, textTransform: 'none', borderRadius: 2, px: 3, py: 1, fontSize: 15, bgcolor: '#fff', '&:hover': { borderColor: '#bdbdbd', bgcolor: '#f5f5f5' } }}>Anthropic Comparison Agent</Button>
                    </Box>
                    <Box sx={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden' }}>
                        <thead style={{ background: '#f3f4f6' }}>
                          <tr>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>Fields</th>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>Type</th>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>MTR</th>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>Unified Spec</th>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { field: 'Certificate ID', type: 'string', mtr: 'HT12086595F', spec: '85~95k', result: 'fail' },
                            { field: 'Material Grade', type: 'string', mtr: '4140 80KSI', spec: '100~110k', result: 'pass' },
                            { field: 'Heat/Lot Number', type: 'string', mtr: '20259782/122154150', spec: '>28%', result: 'fail' },
                            { field: 'Dimensions', type: 'string', mtr: '133.35 mm x 28.448 mm', spec: '<20', result: 'pass' },
                            { field: 'Delivery Condition', type: 'string', mtr: 'Quenched and Tempered', spec: '85~95k', result: 'pass' },
                            { field: 'Manufacturing Route', type: 'string', mtr: 'EAF + LF + RH+ VD + CC', spec: '100~110k', result: 'fail' },
                            { field: 'Reduction Ratio', type: 'float', mtr: '9.4', spec: '>28%', result: 'pass' },
                            { field: 'Chemical Composition', type: 'JSON', mtr: '{"C": "0.39%", "Mn": "0.93%"}', spec: '<20', result: 'pass' },
                            { field: 'Mechanical Props', type: 'JSON', mtr: '{"Yield": "80 KSI"}', spec: '85~95k', result: 'fail' },
                            { field: 'Hardness', type: 'float', mtr: '22.5 HRC', spec: '100~110k', result: 'pass' },
                            { field: 'Charpy Test', type: 'JSON', mtr: '{"Temp": "-10°C", "Energy": "42J"}', spec: '>28%', result: 'pass' },
                            { field: 'NDT Results', type: 'JSON', mtr: '{"UT": "ASTM A388"}', spec: '<20', result: 'pass' },
                          ].map(({ field, type, mtr, spec, result }) => (
                            <tr key={field}>
                              <td style={{ padding: '10px 16px' }}>{field}</td>
                              <td style={{ padding: '10px 16px' }}>{type}</td>
                              <td style={{ padding: '10px 16px' }}>{mtr}</td>
                              <td style={{ padding: '10px 16px' }}>{spec}</td>
                              <td style={{ padding: '10px 16px' }}>
                                {result === 'pass' && (
                                  <span style={{
                                    display: 'inline-flex', alignItems: 'center', padding: '2px 12px', borderRadius: 16,
                                    background: '#e6f4ea', color: '#188038', fontWeight: 500, fontSize: 14, border: '1px solid #b7e1cd'
                                  }}>
                                    ✅ Pass
                                  </span>
                                )}
                                {result === 'fail' && (
                                  <span style={{
                                    display: 'inline-flex', alignItems: 'center', padding: '2px 12px', borderRadius: 16,
                                    background: '#fbeaea', color: '#d93025', fontWeight: 500, fontSize: 14, border: '1px solid #fbcaca'
                                  }}>
                                    ❌ Fail
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </Paper>
                )}
                {/* Step 6: Quality Check AI Table UI */}
                {activeStep === 5 && (
                  <Paper elevation={0} sx={{
                    p: 0,
                    mb: 4,
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    borderRadius: 2,
                    maxWidth: 1100,
                    mx: 'auto',
                  }}>
                    {/* Header Bar */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f8f9fb', borderRadius: 2, px: 2, py: 1, mb: 2 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: 15, color: '#222' }}>
                        Quality Check AI
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" sx={{ color: '#222', borderColor: '#e0e0e0', fontWeight: 600, textTransform: 'none', borderRadius: 2, px: 2.5, py: 1, fontSize: 15, bgcolor: '#fff', '&:hover': { borderColor: '#bdbdbd', bgcolor: '#f5f5f5' } }}>View Material Certificate</Button>
                        <Button variant="outlined" sx={{ color: '#222', borderColor: '#e0e0e0', fontWeight: 600, textTransform: 'none', borderRadius: 2, px: 2.5, py: 1, fontSize: 15, bgcolor: '#fff', '&:hover': { borderColor: '#bdbdbd', bgcolor: '#f5f5f5' } }}>View Unified specification</Button>
                        <TextField
                          select
                          size="small"
                          value="Export as"
                          sx={{ minWidth: 120, bgcolor: '#fff', borderRadius: 1, '& .MuiSelect-icon': { display: 'none' } }}
                          SelectProps={{ native: true, IconComponent: () => <span style={{ marginLeft: 4, fontSize: 18 }}>⭳</span> }}
                          InputProps={{
                            endAdornment: (
                              <span style={{ marginLeft: 4, fontSize: 18, color: '#888' }}>⭳</span>
                            )
                          }}
                        >
                          <option value="Export as">Export as</option>
                          <option value="PDF">PDF</option>
                          <option value="Excel">Excel</option>
                        </TextField>
                      </Box>
                    </Box>
                    {/* Table */}
                    <Box sx={{ overflowX: 'auto', px: 2, pb: 2 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden' }}>
                        <thead style={{ background: '#f3f4f6' }}>
                          <tr>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>Field</th>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { field: 'Certificate ID', type: 'string', example: 'HT12086595F', spec: '85~95k', result: 'fail' },
                            { field: 'Material Grade', type: 'string', example: '4140 80KSI', spec: '100~110k', result: 'pass' },
                            { field: 'Heat/Lot Number', type: 'string', example: '20259782/122154150', spec: '>28%', result: 'fail' },
                            { field: 'Dimensions', type: 'string', example: '133.35 mm x 28.448 mm', spec: '<20', result: 'pass' },
                            { field: 'Delivery Condition', type: 'string', example: 'Quenched and Tempered', spec: '85~95k', result: 'pass' },
                            { field: 'Manufacturing Route', type: 'string', example: 'EAF + LF + RH+ VD + CC', spec: '100~110k', result: 'fail' },
                            { field: 'Reduction Ratio', type: 'float', example: '9.4', spec: '>28%', result: 'pass' },
                            { field: 'Chemical Composition', type: 'JSON', example: '{"C": "0.39%", "Mn": "0.93%"}', spec: '<20', result: 'pass' },
                            { field: 'Mechanical Props', type: 'JSON', example: '{"Yield": "80 KSI"}', spec: '85~95k', result: 'fail' },
                            { field: 'Hardness', type: 'float', example: '22.5 HRC', spec: '100~110k', result: 'pass' },
                            { field: 'Charpy Test', type: 'JSON', example: '{"Temp": "-10°C", "Energy": "42J"}', spec: '>28%', result: 'pass' },
                            { field: 'NDT Results', type: 'JSON', example: '{"UT": "ASTM A388"}', spec: '<20', result: 'pass' },
                          ].map(({ field, type, example, spec, result }) => (
                            <tr key={field}>
                              <td style={{ padding: '10px 16px' }}>{field}</td>
                              <td style={{ padding: '10px 16px' }}>{example}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                  </Paper>
                )}
                {/* Step 7: Final Report Review Table UI */}
                {activeStep === 6 && (
                  <Paper elevation={0} sx={{
                    p: 0,
                    mb: 4,
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    borderRadius: 2,
                    maxWidth: 1100,
                    mx: 'auto',
                  }}>
                    {/* Header Bar */}
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f8f9fb', borderRadius: 2, px: 2, py: 1, mb: 2 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: 15, color: '#222' }}>
                        Final Report Review
                      </Typography>
                    </Box>
                    {/* Table */}
                    <Box sx={{ overflowX: 'auto', px: 2, pb: 2 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden' }}>
                        <thead style={{ background: '#f3f4f6' }}>
                          <tr>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>Field</th>
                            <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: 15, color: '#444' }}>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { field: 'Certificate ID', type: 'string', example: 'HT12086595F', spec: '85~95k', result: 'fail' },
                            { field: 'Material Grade', type: 'string', example: '4140 80KSI', spec: '100~110k', result: 'pass' },
                            { field: 'Heat/Lot Number', type: 'string', example: '20259782/122154150', spec: '>28%', result: 'fail' },
                            { field: 'Dimensions', type: 'string', example: '133.35 mm x 28.448 mm', spec: '<20', result: 'pass' },
                            { field: 'Delivery Condition', type: 'string', example: 'Quenched and Tempered', spec: '85~95k', result: 'pass' },
                            { field: 'Manufacturing Route', type: 'string', example: 'EAF + LF + RH+ VD + CC', spec: '100~110k', result: 'fail' },
                            { field: 'Reduction Ratio', type: 'float', example: '9.4', spec: '>28%', result: 'fail' },
                            { field: 'Chemical Composition', type: 'JSON', example: '{"C": "0.39%", "Mn": "0.93%"}', spec: '<20', result: 'pass' },
                            { field: 'Mechanical Props', type: 'JSON', example: '{"Yield": "80 KSI"}', spec: '85~95k', result: 'fail' },
                            { field: 'Hardness', type: 'float', example: '22.5 HRC', spec: '100~110k', result: 'pass' },
                            { field: 'Charpy Test', type: 'JSON', example: '{"Temp": "-10°C", "Energy": "42J"}', spec: '>28%', result: 'pass' },
                            { field: 'NDT Results', type: 'JSON', example: '{"UT": "ASTM A388"}', spec: '<20', result: 'pass' },
                          ].map(({ field, type, example, spec, result }) => (
                            <tr key={field}>
                              <td style={{ padding: '10px 16px' }}>{field}</td>
                              <td style={{ padding: '10px 16px' }}>{example}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                    {/* Approve/Reject Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, px: 2 }}>
                      <Button variant="outlined" sx={{ color: '#222', borderColor: '#e0e0e0', fontWeight: 600, textTransform: 'none', borderRadius: 2, px: 5, py: 1.5, fontSize: 16, bgcolor: '#f3f4f6', '&:hover': { borderColor: '#bdbdbd', bgcolor: '#e0e0e0' } }}>Reject</Button>
                      <Button variant="contained" sx={{ bgcolor: '#4285f4', color: '#fff', fontWeight: 600, textTransform: 'none', borderRadius: 2, px: 5, py: 1.5, fontSize: 16, boxShadow: 'none', '&:hover': { bgcolor: '#1a73e8' } }}>Approve</Button>
                    </Box>
                  </Paper>
                )}
                {/* Continue & Back Buttons */}
                <Box sx={{ position: 'relative', minHeight: 80, mt: 6, mb:4 }}>
                  {activeStep < steps.length - 1 && (
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#4285f4',
                        color: '#fff',
                        px: 4,
                        py: 1.5,
                        borderRadius: '10px',
                        fontWeight: 600,
                        fontSize: 16,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#1a73e8' },
                        minWidth: 160,
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                      }}
                      disabled={loading}
                      onClick={() => {
                        if (activeStep === 0) {
                          if (!uploadedFile) {
                            setShowUploadError(true);
                            setLoading(false);
                            return;
                          }
                          if (!mdsName.trim()) {
                            setMdsNameError(true);
                            setLoading(false);
                            return;
                          }
                          
                          setLoading(true);
                          
                          const formData = new FormData();
                          formData.append('file', uploadedFile);
                          formData.append('mds_name', mdsName);

                          fetch('/api/proxy/supervisior', {
                            method: 'POST',
                            body: formData
                          })
                          .then(response => response.json())
                          .then(data => {
                            console.log('Supervisor Decision API Response:', data);
                            console.log('Type from API:', data?.decision?.type);
                            setApiResponse(data);
                            setTypeValue(data?.decision?.type || '4140');
                            setLoading(false);
                            setActiveStep((prev) => prev + 1);
                          })
                          .catch(error => {
                            console.error('Error calling supervisor decision API:', error);
                            setApiResponse(error);
                            setLoading(false);
                          });
                        } else if (activeStep === 1) {
                          setLoading(true);
                          
                          const formData = new FormData();
                          formData.append('pdf_text_id', apiResponse?.pdf_text || '');

                          fetch('/api/proxy/extractkey', {
                            method: 'POST',
                            body: formData
                          })
                          .then(response => response.json())
                          .then(data => {
                            console.log('Extract Keys API Response:', data);
                            setApiResponse(data);
                            if (data?.material_identification?.material_grade) {
                              setMaterialType(data.material_identification.material_grade);
                            }
                            setLoading(false);
                            setActiveStep((prev) => prev + 1);
                          })
                          .catch(error => {
                            console.error('Error calling extract keys API:', error);
                            setApiResponse(error);
                            setLoading(false);
                          });
                        } else if (activeStep === 2) {
                          console.log('Type value from step 2 at Continue:', typeValue);
                          setLoading(true);
                          
                          const formData = new FormData();
                          formData.append('mds_name', mdsName);
                          formData.append('grade_label', typeValue);

                          console.log('Sending to unified output API:', { 
                            mds_name: mdsName, 
                            grade_label: typeValue
                          });

                          fetch('/api/proxy/getunifiedoutput', {
                            method: 'POST',
                            body: formData
                          })
                          .then(response => response.json())
                          .then(data => {
                            console.log('Unified Output API Response:', data);
                            setApiResponse(data);
                            setLoading(false);
                            setActiveStep((prev) => prev + 1);
                          })
                          .catch(error => {
                            console.error('Error calling unified output API:', error);
                            setApiResponse(error);
                            setLoading(false);
                          });
                        } else {
                          setLoading(true);
                          setTimeout(() => {
                            setLoading(false);
                            setActiveStep((prev) => prev + 1);
                          }, 1500);
                        }
                      }}
                    >
                      Continue
                    </Button>
                  )}
                </Box>
              </>
            )}
            {/* Upload error Snackbar */}
            <Snackbar
              open={showUploadError}
              autoHideDuration={3000}
              onClose={() => setShowUploadError(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="error" onClose={() => setShowUploadError(false)}>
                Please upload a PDF or image before continuing.
              </Alert>
            </Snackbar>
          </Box>
        )}
    </Box>
  );
} 
 
      