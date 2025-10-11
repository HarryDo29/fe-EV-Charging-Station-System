import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react'
import clsx from 'clsx'
import type { Station } from '../../types/station'
import { useState } from 'react'
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Search = ({
  query,
  setQuery,
  filteredStations,
  setSelectedStationId,
  setSearchStations
}: {
  query: string
  setQuery: (query: string) => void
  filteredStations: () => Station[]
  setSelectedStationId: (stationId: number | null) => void
  setSearchStations: (stations: Station[]) => void
}) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  return (
    <div className='bg-white rounded-4xl shadow-lg p-4 z-[1000] ${}'>
      <Combobox
        nullable={true}
        value={selectedStation}
        onChange={(value) => {
          setSelectedStation(value)
          setSelectedStationId(value?.id || null)
        }}
      >
        <div className='relative'>
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-black',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
            )}
            placeholder='Tìm trạm sạc'
            displayValue={(value: Station) => value?.name || query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                setSearchStations(filteredStations())
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur()
                }
              }
            }}
          />
          <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
            <MagnifyingGlassIcon
              className='size-6 fill-white/60 group-data-hover:fill-white'
              onClick={() => {
                setQuery(query)
                setSearchStations(filteredStations())
                if (document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur()
                }
              }}
            />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          transition
          className={clsx(
            'w-(--input-width) rounded-xl border border-white/5 bg-white p-1 empty:invisible',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0'
          )}
        >
          {filteredStations().map((station: Station) => (
            <ComboboxOption
              key={station.id}
              value={station}
              className='group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10'
            >
              <CheckIcon className='invisible size-4 fill-white group-data-selected:visible' />
              <div className='text-sm/6 text-black'>{station.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}

export default Search
