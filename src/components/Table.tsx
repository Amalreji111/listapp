import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Select,
  MenuItem,
  TablePagination,
  TableSortLabel,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Menu,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  editRow } from '../reduxStore/store';
import SearchIcon from '@mui/icons-material/Search';

interface RowData {
  id: string;
  name: string;
  address: string;
  pincode: string;
  status: string;
}

const TableComponent = () => {
  const [editCell,setEditCell]=useState<{field:string,rowId:string}|null>(null)
  // const classes = useStyles();
  const dispatch = useDispatch();
  const rows = useSelector((state: any) => state.table.rows);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState<RowData[]>(rows);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const initialData: RowData[] = [];
    dispatch(editRow(initialData));
  }, []);

  useEffect(() => {
    const filtered = rows.filter((row:any) =>
      row.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRows(filtered);
  }, [searchText, rows]);

  const handleCellDoubleClick = (rowId: string, field: string) => {
    setEditCell({ rowId, field });
  };

  const handleCellValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { rowId, field } = editCell as unknown as { rowId: string; field: string };

    const updatedRows = rows.map((row: RowData) => {
      if (row.id === rowId) {
        return { ...row, [field]: event.target.value as string };
      }
      return row;
    });
    
    dispatch(editRow(updatedRows));
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const handleOnBlur=()=>{
    setEditCell(null)
  }
  const handleContextMenuClick = (event: React.MouseEvent<HTMLTableRowElement>, rowId: string) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedRowId(rowId);
  };

  const handleContextMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleDeleteRow = () => {
    if (selectedRowId) {
      const updatedRows = rows.filter((row: RowData) => row.id !== selectedRowId);
      dispatch(editRow(updatedRows));
    }
    handleContextMenuClose();
  };
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = sortConfig
    ? [...rows].sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : rows;
  useEffect(()=>{setFilteredRows(sortedRows)},[sortConfig])
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  return (
    <div>
      <Box className={"toolbar"}>
        <Typography variant="h6" id="tableTitle" component="div">
          User Info
        </Typography>
        <FormControl variant="outlined" className={"searchInput"}>
          <InputLabel htmlFor="search-input">Search</InputLabel>
          <OutlinedInput
            id="search-input"
            value={searchText}
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>
      </Box>
      <TableContainer component={Paper} className={"tableContainer"}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel 
                 active={sortConfig?.key === 'name'}
                 direction={sortConfig?.direction}
                 onClick={() => handleSort('name')}
               >
                Name</TableSortLabel>
              </TableCell>
              <TableCell>
              <TableSortLabel 
                 active={sortConfig?.key === 'address'}
                 direction={sortConfig?.direction}
                 onClick={() => handleSort('address')}
               >
                Address</TableSortLabel>
                </TableCell>
              <TableCell>
              <TableSortLabel 
                 active={sortConfig?.key === 'pincode'}
                 direction={sortConfig?.direction}
                 onClick={() => handleSort('pincode')}
               >
                Pincode</TableSortLabel>
                </TableCell>
              <TableCell>
              <TableSortLabel 
                 active={sortConfig?.key === 'status'}
                 direction={sortConfig?.direction}
                 onClick={() => handleSort('status')}
               >
                Status</TableSortLabel>
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredRows
            ).map((row) => (
              <TableRow key={row.id}
              onContextMenu={(event) => handleContextMenuClick(event, row.id)}
              >
                <TableCell onBlur={handleOnBlur} onDoubleClick={() => handleCellDoubleClick(row.id, 'name')}>
                  {editCell?.rowId === row.id && editCell?.field === 'name' ? (
                    <TextField value={row.name} onChange={handleCellValueChange} />
                  ) : (
                    <TextField value={row.name}  disabled/>

                  )}
                </TableCell>
                <TableCell onBlur={handleOnBlur} onDoubleClick={()=>handleCellDoubleClick(row.id,"address")}>
                {editCell?.rowId === row.id && editCell?.field === 'address' ? (
                    <TextField value={row.address} onChange={handleCellValueChange} />
                  ) : (
                    <TextField value={row.address}  disabled/>
                  )}
                </TableCell>
                <TableCell onBlur={handleOnBlur} onDoubleClick={() => handleCellDoubleClick(row.id, 'pincode')}>
                  {editCell?.rowId === row.id && editCell?.field === 'pincode' ? (
                    <TextField value={row.pincode} onChange={handleCellValueChange} />
                  ) : (
                    <TextField value={row.pincode}  disabled/>

                  )}
                </TableCell>
                <TableCell  onDoubleClick={() => handleCellDoubleClick(row.id, 'status')}>
                  {editCell?.rowId === row.id && editCell?.field === 'status' ? (
                    <Select value={row.status}  onChange={handleCellValueChange as any}>
                      <MenuItem onClick={handleOnBlur} value="ACTIVE">ACTIVE</MenuItem>
                      <MenuItem onClick={handleOnBlur}  value="INACTIVE">INACTIVE</MenuItem>
                    </Select>
                  ) : (
                    <Select value={row.status} disabled  >
                    <MenuItem disabled value="ACTIVE">ACTIVE</MenuItem>
                    <MenuItem disabled value="INACTIVE">INACTIVE</MenuItem>
                  </Select>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleContextMenuClose}
        id="context-menu"
      >
        <MenuItem onClick={handleDeleteRow}>Delete Row</MenuItem>
      </Menu>
    </div>
  );
};

export default TableComponent;
