import React from "react";

import { Card, CardMedia, Typography, Box } from "@mui/material";

export default function DrinkCard({ drink }) {
  const ingridients = [];
  const maxIngridients = 4;

  for (let i = 1; i <= maxIngridients; i++) {
    if (drink[`strIngredient${i}`]) {
      ingridients.push(drink[`strIngredient${i}`]);
    }
  }

  return (
    <Card sx={{ maxWidth: "300px", margin: "10px" }}>
      <CardMedia
        component="img"
        alt={drink.strDrink}
        image={drink.strDrinkThumb}
      />
      <Typography
        sx={{
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          margin: "20px",
          padding: "0 0 10px 0",
        }}
        variant="h6"
      >
        {drink.strDrink}
      </Typography>
      <Box sx={{ margin: "0 20px" }}>
        <Typography
          variant="h6"
          sx={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          Ingredients
        </Typography>
        {ingridients.map((ingredient, index) => {
          return (
            <Typography
              sx={{ paddingBottom: "10px" }}
              variant="body1"
              key={index}
            >
              {ingredient}
            </Typography>
          );
        })}
      </Box>
      <Box sx={{ margin: " 0 20px" }}>
        <Typography
          sx={{
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            paddingBottom: "10px",
          }}
          variant="h6"
        >
          Instructions
        </Typography>
        <Typography sx={{ padding: "10px 0" }} variant="body1">
          {drink.strInstructions}
        </Typography>
      </Box>
    </Card>
  );
}
