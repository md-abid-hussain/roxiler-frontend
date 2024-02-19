import { useState, SetStateAction, useDeferredValue } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import { useQuery } from "react-query";

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

type Err = {
  message: string;
};

const Test = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [month, setMonth] = useState("3");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const {
    isLoading,
    error,
    data: transactionData,
  } = useQuery({
    queryKey: ["transactions", month, currentPage, search],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://transaction-backend.onrender.com/api/v1/transactions?month=${month}&currentPage=${currentPage}&limit=10&search=${deferredSearch}`
        );
        return res.json();
      } catch (err) {
        throw new Error("Failed to Fetch");
      }
    },
    onError: (error: Err) => {
      error.message = error.message || "Failed to Fetch";
      return error;
    },
  });

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMonth(event.target.value);
    setCurrentPage(1);
  };

  let content;

  if (isLoading) {
    content = (
      <Box sx={{ display: "grid", height: 500, placeContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    content = (
      <Box padding={1} sx={{ color: "red", textAlign: "center" }}>
        {error.message}
      </Box>
    );
  }

  if (transactionData) {
    content = (
      <Box marginBottom="4rem" padding={0.25}>
        <Box>
          <TransactionTable data={transactionData.data} />
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
            Page {currentPage} of {transactionData.totalPages}
          </p>

          <Button
            disabled={currentPage == transactionData.totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next <KeyboardArrowRightIcon />
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh">
      <DetailModal
        open={open}
        handleClose={handleClose}
        month={parseInt(month)}
      />
      <Stack
        sx={{ backgroundColor: "#27496D" }}
        padding={2}
      >
        <Typography
          variant="h1"
          fontSize={44}
          fontWeight={900}
          color={"white"}
          component="div"
          textAlign="center"
        >
          Transaction Dashboard
        </Typography>
      </Stack>

      <Box marginInline="auto" maxWidth={1000}>
        <Box margin={3}>
          <FormControl fullWidth>
            <Stack flexDirection="row" flexWrap="wrap" gap={4} justifyContent="space-between">
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
        {content}
      </Box>
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          color: "#27496D",
          "&:hover": { backgroundColor: "#27496D", color: "white" },
        }}
        onClick={handleOpen}
      >
        <BarChartIcon sx={{ mr: 1 }} />
        Show Monthly Stats
      </Fab>
    </Box>
  );
};

export default Test;
