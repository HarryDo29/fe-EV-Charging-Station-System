import type { Station } from '../../interface/station.interface'
import type { Coordinates } from '../../interface/coordinate.interface'
import EVMapStation from '../EVMap/EVMapStation'
import { Modal, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface MapModalProps {
  location: Coordinates | null
  station: Station | null
  showMapModal: boolean
  onClose?: () => void
}

const MapModal = ({ location, station, onClose }: MapModalProps) => {
  if (!station) return null

  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <Modal
      open={true}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }
      }}
    >
      <div className='relative w-[95vw] max-w-[900px] h-[85vh] max-h-[700px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-300 ease-out'>
        {/* Header */}
        <div className='absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 shadow-lg'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold tracking-tight'>{station.name}</h2>
              <p className='text-sm text-blue-100 mt-0.5'>{station.address}</p>
            </div>
            <IconButton
              onClick={handleClose}
              className='hover:bg-white/20 transition-all duration-200'
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'rotate(90deg)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        {/* Map Content */}
        <div className='h-full pt-20 pb-4 px-4'>
          <div className='h-full rounded-xl overflow-hidden shadow-inner border border-gray-200'>
            <EVMapStation location={location} station={station} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default MapModal
