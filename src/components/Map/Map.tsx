import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import L from 'leaflet'
import type { Coordinates, Station } from '../../types/station'

// Fix default marker icon issue with Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
})

interface EVMapProps {
  location: Coordinates | null
  stations: Station[]
  selectedStationId: number | null
  onStationSelect: (stationId: number) => void
}

// Component to handle map centering
function MapController({ selectedStation }: { selectedStation: Station | null }) {
  const map = useMap()

  useEffect(() => {
    if (selectedStation) {
      map.flyTo([selectedStation.lat, selectedStation.lng], 16, {
        duration: 1
      })
    }
  }, [selectedStation, map])

  return null
}

const getStatusColor = (status?: string) => {
  switch (status) {
    case 'available':
      return 'green'
    case 'busy':
      return 'orange'
    case 'offline':
      return 'red'
    default:
      return 'blue'
  }
}

const createCustomIcon = (status?: string, isSelected?: boolean) => {
  const color = getStatusColor(status)
  const size = isSelected ? 40 : 30

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
        ${isSelected ? 'animation: bounce 0.5s;' : ''}
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: ${isSelected ? '16px' : '12px'};
        ">⚡</div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size]
  })
}

export default function EVMap({ location, stations, selectedStationId, onStationSelect }: EVMapProps) {
  const center: [number, number] = location ? [location.lat, location.lng] : [10.84102, 106.80941]
  const zoom = location ? 9 : 10
  const selectedStation = stations.find((s) => s.id === selectedStationId) || null

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

      <MapController selectedStation={selectedStation} />
      <ZoomControl position='bottomright' />
      {/* Current location marker */}
      {location && (
        <Marker position={[location.lat, location.lng]}>
          <Popup>Vị trí của bạn</Popup>
        </Marker>
      )}

      {/* Station markers */}
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={createCustomIcon(station.status, station.id === selectedStationId)}
          eventHandlers={{
            click: () => {
              onStationSelect(station.id)
            }
          }}
        >
          <Popup>
            <div className='p-2'>
              <h3 className='font-bold text-lg mb-2'>{station.name}</h3>
              <p className='text-sm text-gray-600 mb-2'>{station.address}</p>
              <div className='space-y-1 text-sm'>
                <p>
                  <span className='font-semibold'>Trạng thái: </span>
                  <span
                    className={`font-medium ${station.status === 'available' ? 'text-green-600' : station.status === 'busy' ? 'text-yellow-600' : 'text-red-600'}`}
                  >
                    {station.status === 'available' ? 'Có sẵn' : station.status === 'busy' ? 'Đang bận' : 'Offline'}
                  </span>
                </p>
                {station.totalChargers && (
                  <p>
                    <span className='font-semibold'>Trạm sạc: </span>
                    {station.availableChargers || 0}/{station.totalChargers}
                  </p>
                )}
                {station.price && (
                  <p>
                    <span className='font-semibold'>Giá: </span>
                    {station.price.toLocaleString()} đ/kWh
                  </p>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
