import { configureStore } from "@reduxjs/toolkit"
import themeGlobeReducer from "../features/themeGlobe/themeGlobeSlice"

const store = configureStore({
  reducer: {
    themeGlobe: themeGlobeReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
