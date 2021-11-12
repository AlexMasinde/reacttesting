import React from "react";

import fetchDrinks from "./fetchDrinks";

import DrinkCard from "./DrinkCard";

import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function DrinksComponent() {
  const [drinks, setDrinks] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [drinkQuery, setDrinkQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function getDrinks() {
    if (drinkQuery.trim() === "") return;
    try {
      setError(null);
      setLoading(true);
      const data = await fetchDrinks(drinkQuery);
      setDrinks(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("service unavailable");
    }
    setDrinkQuery("");
  }

  function renderDrinks() {
    return drinks.map((drink, index) => {
      return <DrinkCard key={index} drink={drink} />;
    });
  }

  async function handleEnter(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      await getDrinks();
    }
  }

  return (
    <div>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
          margin: "10px auto",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          sx={{ marginBottom: "10px" }}
          onChange={(e) => setDrinkQuery(e.target.value)}
          value={drinkQuery}
          onKeyUp={handleEnter}
        />
        <Button
          variant="contained"
          sx={{ padding: "10px 0" }}
          onClick={getDrinks}
        >
          Search
        </Button>
      </Box>

      {loading && (
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            margin: "20px auto 0",
          }}
        >
          <HourglassEmptyIcon
            color="primary"
            sx={{
              fontSize: 30,
              width: "30px",
              margin: "auto",
              display: "block",
            }}
          />
          <Typography>Loading...</Typography>
          <HourglassEmptyIcon
            color="primary"
            sx={{
              fontSize: 30,
              width: "30px",
              margin: "auto",
              display: "block",
            }}
          />
        </Box>
      )}
      {error && (
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            margin: "20px auto 0",
          }}
        >
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 25, color: "red" }} />
          <Typography>{` ${error} `}</Typography>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 25, color: "red" }} />
        </Box>
      )}
      {drinks && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          {renderDrinks()}
        </Box>
      )}

      {!drinks && (
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            margin: "20px auto 0",
          }}
        >
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 25, color: "red" }} />
          <Typography>No Drinks Found</Typography>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 25, color: "red" }} />
        </Box>
      )}
    </div>
  );
}
