import type { ChargePoint } from '../../types/station'
import ChargePointCard from './ChargePointCard'

interface ChargePointListProps {
  chargePoints: ChargePoint[]
  selectedChargePoint: ChargePoint | null
  setSelectedChargePoint: (cp: ChargePoint) => void
}

const ChargePointList = ({ chargePoints, selectedChargePoint, setSelectedChargePoint }: ChargePointListProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {chargePoints.map((cp: ChargePoint) => (
        <ChargePointCard
          key={cp.id}
          chargePoint={cp}
          selectedChargePoint={selectedChargePoint}
          setSelectedChargePoint={setSelectedChargePoint}
        />
      ))}
    </div>
  )
}

export default ChargePointList
