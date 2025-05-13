'use client'
import { Box, Typography } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function History() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;
  
  const fileData = [
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'test-cert1.pdf', type: 'PDF', metadata: 'Copper C11000, ASTM B152', date: '2025-05-01', status: 'draft' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'MTR-2345.pdf', type: 'PDF', metadata: 'Steel Grade 304, ASTM A240', date: '2025-05-01', status: 'processing' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
    { filename: 'alloy-plate.png', type: 'Image (Text)', metadata: 'Aluminum 6061, ISO 6361', date: '2025-05-02', status: 'completed' },
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

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      p: { xs: 2, sm: 3 }
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
  );
}


