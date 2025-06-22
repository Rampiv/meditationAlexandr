import { useAppDispatch, useAppSelector } from "./app/hooks"
import "./App.scss"
import { Demography, GlobeApp, Header } from "./components"
import { toggleTheme } from "./features/themeGlobe/themeGlobeSlice"
import { Switch } from "antd"

export const App = () => {
  const dispatch = useAppDispatch()
  const themeGlobe = useAppSelector(state => state.themeGlobe)

  function toggleThemeGlobe() {
    if (themeGlobe === "day") {
      dispatch(toggleTheme("night"))
    } else dispatch(toggleTheme("day"))
  }

  return (
    <div className="App">
      <h1></h1>
      <Header />
      <Demography />
      <section id="globe">
        <div className="container">
          <div className="globe">
            <Switch onClick={toggleThemeGlobe} />
            <GlobeApp />
          </div>
        </div>
      </section>
      <section id="part-2">s</section>
      <section id="part-3">a</section>
      <footer></footer>
    </div>
  )
}
