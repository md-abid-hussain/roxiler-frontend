import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import TextField from "@mui/material/TextField";
import TransactionTable from "./TransactionTable";
import DetailModal from "./DetailModal";
import BarChartIcon from "@mui/icons-material/BarChart";

const menuItems = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const Test = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("3");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await fetch(
      `https://transaction-backend.onrender.com/api/v1/transactions?month=${month}&currentPage=${currentPage}&limit=10&search=${search}`
    );
    const data = await res.json();
    setData(data.data);
    setCurrentPage(parseInt(data.currentPage));
    setTotalPages(parseInt(data.totalPages));
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, month, search]);

  const handleChange = (event) => {
    setMonth(event.target.value);
    setCurrentPage(1);
  };
  return (
    <Box>
      <DetailModal open={open} handleClose={handleClose} month={month} />
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        sx={{ backgroundColor: "#27496D" }}
        padding={2}
      >
        <Typography
          variant="h1"
          fontSize={44}
          fontWeight={900}
          color={"white"}
          gutterBottom
          component="div"
        >
          Transaction Dashboard
        </Typography>
        <Button onClick={handleOpen}>
          <Typography variant="h5">Monthly Statistics</Typography>
          <BarChartIcon fontSize="large"/>
        </Button>
      </Stack>

        <Box marginInline="auto" width={1000}>
      <Box margin={3}>
        <FormControl fullWidth>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box width={300}>
              <TextField
                fullWidth
                id="search"
                name="search"
                value={search}
                label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            <Box width={300}>
              <TextField
                id="month"
                fullWidth
                select
                name="month"
                value={month}
                label="Selected Month"
                onChange={handleChange}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Stack>
        </FormControl>
      </Box>
      <Box>
        <TransactionTable data={data} />
      </Box>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          disabled={currentPage == 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <KeyboardArrowLeftIcon /> Previous
        </Button>
        <p>
          Page {currentPage} of {totalPages}
        </p>

        <Button
          disabled={currentPage == totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next <KeyboardArrowRightIcon />
        </Button>
      </Stack>
      </Box>
    </Box>
  );
};

export default Test;
