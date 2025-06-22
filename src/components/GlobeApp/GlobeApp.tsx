import Globe from "react-globe.gl"
import { useViewportSize } from "../../utils/hooks"
import type { GlobeMethods } from "react-globe.gl"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { isGlobeFeature } from "../../utils/other"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { CountryFeature } from "../../data/dataCountry"
import { dataCountry } from "../../data/dataCountry"
import { Switch } from "antd"
import { toggleTheme } from "../../features/themeGlobe/themeGlobeSlice"
import './GlobeApp.scss';

export const GlobeApp = () => {
  const dispatch = useAppDispatch()
  const { getWidthPercent, getHeightPercent } = useViewportSize()
  const globeRef = useRef<GlobeMethods>(undefined)
  const [countryData] = useState<CountryFeature[]>(dataCountry)
  const themeGlobe = useAppSelector(state => state.themeGlobe)

  // функция изменения картинки планеты
  function toggleThemeGlobe() {
    if (themeGlobe === "day") {
      dispatch(toggleTheme("night"))
    } else dispatch(toggleTheme("day"))
  }

  // мемоизация
  const width = useMemo(() => getWidthPercent(50), [getWidthPercent])
  const height = useMemo(() => getHeightPercent(50), [getHeightPercent])
  const getLabelLat = useCallback((d: unknown) => {
    if (isGlobeFeature(d)) {
      return d.properties.latitude
    }
    return 0
  }, [])
  const getLabelLng = useCallback((d: unknown) => {
    if (isGlobeFeature(d)) {
      return d.properties.longitude
    }
    return 0
  }, [])
  const getLabelText = useCallback((d: unknown) => {
    if (isGlobeFeature(d)) {
      return d.properties.name
    }
    return "default"
  }, [])
  const getLabellSize = useCallback((d: unknown) => {
    if (isGlobeFeature(d)) {
      return Math.sqrt(d.properties.pop_max) * 4e-4
    }
    return 0
  }, [])
  const getLabellRadius = useCallback((d: unknown) => {
    if (isGlobeFeature(d)) {
      return Math.sqrt(d.properties.pop_max) * 4e-4
    }
    return 0
  }, [])
  const getLabelColor = useCallback(() => "rgba(255, 0, 0, 0.75)", [])

  // initial position для глобуса
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: 39.6916, // широта
        lng: 54.6269, // долгота
        altitude: 2, // высота
      })
    }
  }, [])

  return (
    <section id="globe">
      <div className="container">
        <div className="globe">
          <span>Тут должна быть статистика по странам. Ну и нафига я читал документацию, чтобы этот красивый глобус тут был? А это переключение картинки:</span>
          <Switch onClick={toggleThemeGlobe} />
          <Globe
            ref={globeRef}
            globeImageUrl={
              themeGlobe === "day"
                ? "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg"
                : "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
            }
            backgroundImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png"
            labelsData={countryData}
            labelLat={getLabelLat}
            labelLng={getLabelLng}
            labelText={getLabelText}
            labelSize={getLabellSize}
            labelDotRadius={getLabellRadius}
            labelColor={getLabelColor}
            labelResolution={3}
            atmosphereAltitude={0.15}
            // сместить вбок ес чо
            // globeOffset={[getWidthPercent(10), 0]}
            width={width}
            height={height}
          />
        </div>
      </div>
    </section>
  )
}
