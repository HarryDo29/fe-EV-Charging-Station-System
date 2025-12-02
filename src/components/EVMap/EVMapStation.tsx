import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import L from 'leaflet'
import type { Coordinates } from '../../interface/coordinate.interface'
import type { Station } from '../../interface/station.interface'
import { StationStatus } from '../../constants/stationStatus'

// Fix default marker icon issue with Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
})

interface EVMapStationProps {
  location: Coordinates | null
  station: Station
}

// Component to handle map centering
function MapController({ station }: { station: Station }) {
  const map = useMap()

  useEffect(() => {
    if (station) {
      map.flyTo([station.latitude, station.longitude], 16, {
        duration: 1
      })
    }
  }, [station, map])

  return null
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case StationStatus.AVAILABLE:
      return 'green'
    case StationStatus.UNAVAILABLE:
      return 'red'
    case StationStatus.MAINTENANCE:
      return 'blue'
    default:
      return 'gray'
  }
}

const createCustomIcon = (status?: string) => {
  const color = getStatusColor(status)
  const size = 40

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        background-color: ${color}; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 16px;
        ">⚡</div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size]
  })
}

export default function EVMapStation({ location, station }: EVMapStationProps) {
  const center: [number, number] = location ? [location.lat, location.lng] : [10.84102, 106.80941]
  const zoom = location ? 2 : 3

  return (
    <MapContainer center={center} zoom={zoom} zoomControl={false} style={{ height: '100%', width: '100%' }}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      {/* Nguồn bản đồ */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
      />

      <MapController station={station} />
      {/* <ZoomControl position='bottomright' /> */}
      {/* Current location marker */}
      {location && (
        <Marker position={[location.lat, location.lng]}>
          <Popup>Vị trí của bạn</Popup>
        </Marker>
      )}

      {/* Station markers */}
      <Marker key={station.id} position={[station.latitude, station.longitude]} icon={createCustomIcon(station.status)}>
        <Popup>
          <div className='p-2'>
            <h3 className='font-bold text-lg mb-2'>{station.name}</h3>
            <p className='text-sm text-gray-600 mb-2'>{station.address}</p>
            <div className='space-y-1 text-sm'>
              <p>
                <span className='font-semibold'>Trạng thái: </span>
                <span
                  className={`font-medium ${station.status === StationStatus.AVAILABLE ? 'text-green-600' : station.status === StationStatus.UNAVAILABLE ? 'text-yellow-600' : 'text-red-600'}`}
                >
                  {station.status === StationStatus.AVAILABLE
                    ? 'Có sẵn'
                    : station.status === StationStatus.UNAVAILABLE
                      ? 'Đang bận'
                      : 'Offline'}
                </span>
              </p>
              <p>
                <span className='font-semibold'>Trạm sạc: </span>
                {station.availableChargePoints || 0}/{station.totalChargePoints}
              </p>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
