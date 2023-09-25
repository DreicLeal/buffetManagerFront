import React from "react";
import { FoodProvider } from "@/contexts/foodContext";
import Header from "@/components/header/header";
import DishContainer from "@/components/DishContainer/DishContainer";

function App() {
  return (
    <FoodProvider>
      <div className="App">
        <Header />
        <DishContainer />
      </div>
    </FoodProvider>
  );
}

export default App;
