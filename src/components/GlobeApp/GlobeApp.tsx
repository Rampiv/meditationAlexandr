import Globe from "react-globe.gl"
import { useViewportSize } from "../../utils/hooks"
import type { GlobeMethods } from "react-globe.gl"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { country, type CountryFeature } from "../../app/country"
import { isGlobeFeature } from "../../utils/other"
import { useAppSelector } from "../../app/hooks"

export const GlobeApp = () => {
  const { getWidthPercent, getHeightPercent } = useViewportSize()
  const globeRef = useRef<GlobeMethods>(undefined)
  const [countryData] = useState<CountryFeature[]>(country)
  const themeGlobe = useAppSelector(state => state.themeGlobe)

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
    <section className="globe-container">
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
    </section>
  )
}
