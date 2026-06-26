"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type Point = { name: string; address: string; coords?: { lat: number; lng: number } }

const markerIcon = L.divIcon({
  className: "",
  html: `<span style="
    display:block;width:18px;height:18px;border-radius:9999px;
    background:oklch(0.5 0.19 262);border:3px solid white;
    box-shadow:0 1px 4px rgba(0,0,0,0.4);
  "></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  popupAnchor: [0, -10],
})

const center: [number, number] = [41.405, 2.168]

export default function PointsMap({ collectionPoints }: { collectionPoints: Point[] }) {
  const points = collectionPoints.filter((p) => p.coords)
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p) => (
        <Marker key={p.name} position={[p.coords!.lat, p.coords!.lng]} icon={markerIcon}>
          <Popup>
            <span className="font-semibold">{p.name}</span>
            <br />
            {p.address}, Barcelona
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
