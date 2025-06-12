'use client';

import { useState, useEffect, useMemo } from 'react';
import { useContent } from '@/lib/api/content';
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

interface ContentParams {
  type: string;
  attributes: {
    type: string;
    status?: string;
    publisher_id?: string;
    search?: string;
  };
  limit: number;
}

interface ContentListProps {
  contentParams: ContentParams;
}

export default function ContentList({ contentParams }: ContentListProps) {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 1
  });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useContent(contentParams);

  const allContent = useMemo(() => data?.pages.flatMap(p => p.contents) ?? [], [data]);

  // Fetch next page if needed
  useEffect(() => {
    if (
      paginationModel.page >= allContent.length &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [paginationModel.page, allContent.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
    { field: 'description', headerName: 'Description', flex: 1.5, minWidth: 300 },
    { field: 'type', headerName: 'Type', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'DRAFT' ? 'default' : 'primary'}
          variant="outlined"
        />
      )
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {params.value.slice(0, 2).map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
          {params.value.length > 2 && (
            <Chip
              label={`+${params.value.length - 2}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>
      )
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 150,
      valueFormatter: (value) => new Date(value).toLocaleDateString()
    },
    {
      field: 'format',
      headerName: 'Format',
      width: 100,
      valueGetter: (value, row) => row.metadata?.format || '-'
    },
    {
      field: 'pages',
      headerName: 'Pages',
      width: 80,
      valueGetter: (value, row) => row.metadata?.pages || '-'
    }
  ];

  const visibleRow = allContent[paginationModel.page]
    ? [{ ...allContent[paginationModel.page], id: allContent[paginationModel.page].content_id }]
    : [];

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
      <Card sx={{ width: '100%' }}>
        <DataGrid
          rows={visibleRow}
          columns={columns}
          rowCount={hasNextPage ? allContent.length + 1 : allContent.length}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => {
            const nextPage = model.page;
            // Only allow advancing if data exists or can be fetched
            if (nextPage < allContent.length || hasNextPage) {
              setPaginationModel({ ...model, pageSize: 1 });
            }
          }}
          pageSizeOptions={[1]}
          disableRowSelectionOnClick
          loading={isLoading || isFetchingNextPage}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'background.paper',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderBottomColor: 'divider',
            },
          }}
        />
      </Card>
    </Box>
  );
}
