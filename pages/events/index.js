import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import {API_URL, PER_PAGE} from '@/config/index'

export default function EventsPage({events, page, total}) {
  const lastPage = Math.ceil(total / PER_PAGE)
 
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />

      {/*{events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}*/}
     
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`
  )
  const total = await totalRes.json()


  // Fetch events
  const eventres = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventres.json()

  return {
    props: { events, page: +page, total },
  }
}