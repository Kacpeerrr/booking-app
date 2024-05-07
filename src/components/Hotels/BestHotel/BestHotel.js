import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const BestHotel = props => {
	const [time, setTime] = useState('')
	const endTime = moment().add(23, 'minutes').add(5, 'seconds')
	const hotel = props.getHotel()
	let interval = null

	useEffect(() => {
		interval = setInterval(() => {
			const leftTime = -moment().diff(endTime) / 1000
			const minutes = Math.floor(leftTime / 60)
			const seconds = Math.floor(leftTime % 60)
			setTime(`minut: ${minutes}, sekund: ${seconds}`)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	if (!hotel) return null

	return (
		<div className='card bg-success text-white'>
			<div className='card-header'>Najlepsza oferta</div>
			<div className='card-body'>
				<div className='d-flex justify-content-between'>
					<h5 className='card-title'>{hotel.name}</h5>
					<p>Ocena: {hotel.rating}</p>
				</div>
				<p>Do końca oferty pozostało: {time}</p>
				<Link
					to={`/hotele/${hotel.id}`}
					className='btn btn-sm btn-light'>
					Pokaż
				</Link>
			</div>
		</div>
	)
}

export default BestHotel
