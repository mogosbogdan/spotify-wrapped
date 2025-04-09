import React from "react";
import { mapPlaceholderValues } from "./placeholderMapper";

const App = () => {
  const input = "Your amount is $amount$";
  return <div>{mapPlaceholderValues(input, { amount: 44 })}</div>;
};

export default App;
