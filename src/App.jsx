import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import GamePage from "./pages/GamePage/GamePage";
import TestPage from "./pages/TestPage/TestPage";
import { game } from "./reducers/game"

const reducer = combineReducers({
  game: game.reducer,
});

const store = configureStore({ reducer });

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/gamepage" element={<GamePage />}></Route>
            <Route path="/testpage" element={<TestPage />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
