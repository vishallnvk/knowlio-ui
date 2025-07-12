'use client';

import { useState, useEffect, useMemo } from 'react';
import { useContent, ContentParams } from '@/lib/api/content';
import {
  Box,
  Card,
  Chip,
  Alert,
  Typography
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel
} from '@mui/x-data-grid';

interface ContentListProps {
  contentParams: ContentParams;
}

export default function ContentList({ contentParams }: ContentListProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useContent(contentParams);

  const allContent = useMemo(() => data?.pages.flatMap(p => p.items) ?? [], [data]);

  // Fetch next page if needed
  useEffect(() => {
    const currentPageStart = paginationModel.page * paginationModel.pageSize;
    const needsMoreData = currentPageStart >= allContent.length;
    
    if (needsMoreData && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [paginationModel.page, paginationModel.pageSize, allContent.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
    { 
      field: 'publisher', 
      headerName: 'Publisher', 
      flex: 1, 
      minWidth: 200,
      valueGetter: (value, row) => row.publisher || '-'
    },
    { field: 'type', headerName: 'Type', width: 100 },
    {
      field: 'licensing_status',
      headerName: 'License Status',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'DISABLED' ? 'default' : 'primary'}
          variant="outlined"
        />
      )
    },
    {
      field: 'keywords',
      headerName: 'Keywords',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const keywords = params.value || [];
        if (!Array.isArray(keywords) || keywords.length === 0) {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
              <Typography variant="body2" color="text.secondary">-</Typography>
            </Box>
          );
        }
        return (
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 0.5, 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              py: 1
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {keywords.slice(0, 2).map((keyword: string, index: number) => (
              <Chip
                key={`${params.id}-keyword-${index}-${keyword}`}
                label={keyword}
                size="small"
                variant="outlined"
                sx={{ 
                  fontSize: '0.75rem',
                  pointerEvents: 'none'
                }}
              />
            ))}
            {keywords.length > 2 && (
              <Chip
                key={`${params.id}-more-keywords`}
                label={`+${keywords.length - 2}`}
                size="small"
                variant="outlined"
                sx={{ 
                  fontSize: '0.75rem',
                  pointerEvents: 'none'
                }}
              />
            )}
          </Box>
        );
      }
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 150,
      valueFormatter: (value) => new Date(value).toLocaleDateString()
    },
    {
      field: 'isbn',
      headerName: 'ISBN',
      width: 150,
      valueGetter: (value, row) => row.isbn || '-'
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 80,
      valueGetter: (value, row) => row.year || '-'
    }
  ];

  // Map all content items to include the required id property
  const rowsWithIds = allContent.map(item => ({
    ...item,
    id: item.content_id
  }));
  
  // Get only the rows for the current page
  const startIndex = paginationModel.page * paginationModel.pageSize;
  const endIndex = startIndex + paginationModel.pageSize;
  const currentPageRows = rowsWithIds.slice(startIndex, endIndex);

  if (error) {
    return (
      <Box sx={{ width: '100%' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6" component="div">
            Error Loading Content
          </Typography>
          <Typography variant="body2">
            {error.message || 'An error occurred while fetching content. Please try again.'}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        width: '100%', 
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: 0,
        overflow: 'hidden'
      }}>
        <DataGrid
          rows={currentPageRows}
          columns={columns}
          rowCount={hasNextPage ? allContent.length + paginationModel.pageSize : allContent.length}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => {
            setPaginationModel(model);
          }}
          disableRowSelectionOnClick
          loading={isLoading || isFetchingNextPage}
          sx={{
            border: 'none',
            borderRadius: 0,
            '& .MuiDataGrid-main': {
              borderRadius: 0,
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8fafc',
              borderBottom: '2px solid #e5e7eb',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              '& .MuiDataGrid-columnHeader': {
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#374151',
                '&:focus': {
                  outline: 'none',
                },
                '&:focus-within': {
                  outline: 'none',
                },
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 600,
                color: '#374151',
              },
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f3f4f6',
              fontSize: '0.875rem',
              color: '#6b7280',
              '&:focus': {
                outline: 'none',
              },
              '&:focus-within': {
                outline: 'none',
              },
            },
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: '#f9fafb',
              },
              '&.Mui-selected': {
                backgroundColor: '#f0f9ff',
                '&:hover': {
                  backgroundColor: '#e0f2fe',
                },
              },
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #e5e7eb',
              backgroundColor: '#f8fafc',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: 'white',
            },
          }}
        />
      </Box>
    </Box>
  );
}
