import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

type Theme = "day" | "night"

export const themeGlobeSlice = createAppSlice({
  name: "themeGlobe",
  initialState: "day" as Theme,
  reducers: {
    toggleTheme: (_, action: PayloadAction<Theme>) => action.payload,
  },
})

export const { toggleTheme } = themeGlobeSlice.actions
export default themeGlobeSlice.reducer
