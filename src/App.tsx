import "./App.scss"
import { Demography, GlobeApp, Header } from "./components"
import { Route, Routes } from "react-router"

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1></h1>
              <Demography />
              <GlobeApp />
            </>
          }
        />
      </Routes>
      <span className="alert">Этот проект никогда не будет завершен по причине: Саня сдулся, ничего не хочет делать</span>
    </div>
  )
}
