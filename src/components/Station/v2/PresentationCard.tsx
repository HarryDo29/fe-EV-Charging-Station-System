import type { Station } from '../../../interface/station.interface'
import StationCard from './StationCard'

interface PresentationCardProps {
  stations: Station[]
}

const PresentationCard = ({ stations }: PresentationCardProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
      {stations.map((station: Station) => (
        <StationCard key={station.id} {...station} />
      ))}
    </div>
  )
}

export default PresentationCard
