import { Calendar, dateFnsLocalizer, Event, Views } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { enUS, enGB, enCA, enNZ, enAU } from 'date-fns/locale'
import { useRouter } from 'next/router'

const locales = {
  'en-US': enUS,
  'en-GB': enGB,
  'en-CA': enCA,
  'en-AU': enAU,
  'en-NZ': enNZ,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export function CalendarView({ events }: { events: Event[] }) {
  const router = useRouter()
  return (
    <Calendar
      defaultView={Views.MONTH}
      events={events}
      localizer={localizer}
      style={{ height: '100vh' }}
      onSelectEvent={(event) => router.push(`/trips/${event.resource.tripId}`)}
    />
  )
}
