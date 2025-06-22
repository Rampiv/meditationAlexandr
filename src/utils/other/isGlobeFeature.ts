type CountryProperties = {
  name: string
  latitude: number
  longitude: number
  pop_max: number
}

type GlobeFeature = {
  properties: CountryProperties
}

// Тип-гард для проверки структуры объекта исключительно для пропсов react-globe.gl
export function isGlobeFeature(d: unknown): d is GlobeFeature {
  return (
    typeof d === "object" &&
    d !== null &&
    "properties" in d &&
    typeof (d as { properties: unknown }).properties === "object" &&
    (d as { properties: { latitude?: unknown } }).properties.latitude !==
      undefined
  )
}
