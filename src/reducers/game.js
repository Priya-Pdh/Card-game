import { createSlice } from "@reduxjs/toolkit";

const products = [
  {
    id: 1,
    name: "smartphone",
    co2: 18,
    img: "../assets/smartphone.svg",
    hidden: true,
    description: "des_smartphone",

  },
  {
    id: 2,
    name: "jeans",
    co2: 22,
    img: "../assets/jeans.svg",
    hidden: true,
    description: "des_jeans",

  },
  {
    id: 3,
    name: "T-shirt",
    co2: 6,
    img: "../assets/t-shirt.svg",
    hidden: true,
    description: "des_shirt",
  },
  {
    id: 4,
    name: "bag",
    co2: 7.5,
    img: "../assets/bicycle.svg",
    hidden: true,
    description: "des_bag",
  },
  {
    id: 5,
    name: "sneakers",
    co2: 11.5,
    img: "../assets/sneakers.svg",
    hidden: true,
    description: "des_sneakers",
  },
  {
    id: 6,
    name: "air_travel",
    co2: 150,
    img: "../assets/flight.svg",
    hidden: true,
    description: "des_air",
  },
  {
    id: 6,
    name: "Air travel",
    co2: 150,
    img: "../assets/flight.svg",
    hidden: true,
    description: "des_air",
  },
  {
    id: 7,
    name: "travel_by_bus",
    co2: 0.2,
    img: "../assets/bus.svg",
    hidden: true,
    description: "des_bus",

  },
  {
    id: 8,
    name: "travel_by_train",
    co2: 0.1,
    img: "../assets/train.svg",
    hidden: true,
    description: "des_train",
  },
  {
    id: 9,
    name: "travel_by_car",
    co2: 0.3,
    img: "../assets/car.svg",
    hidden: true,
    description: "des_car",

  },
  {
    id: 10,
    name: "coffee_consumption",
    co2: 1.5,
    img: "../assets/coffee.svg",
    hidden: true,
    description: "des_coffee",

  },
  {
    id: 11,
    name: "veg_diet",
    co2: 48,
    img: "../assets/vegetarian.svg",
    hidden: true,
    description: "des_veg",
  },
  {
    id: 12,
    name: "meat_diet",
    co2: 77,
    img: "../assets/meat.svg",
    hidden: true,
    description: "des_meat",
  }
];

const initialState = {
  products,
};

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    restart: () => {
      return initialState;
    },
  },
});

export const {  restart } = game.actions;
export default game.reducer;
