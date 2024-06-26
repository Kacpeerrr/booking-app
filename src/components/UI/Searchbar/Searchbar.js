import { useContext, useEffect, useState, useRef } from 'react'
import ThemeContext from '../../../context/themeContext'
import { useNavigate  } from 'react-router-dom'


function Searchbar(props) {
	const [term, setTerm] = useState('')
	const theme = useContext(ThemeContext)
	const inputRef = useRef(null)
	const history = useNavigate()

	const search = () => {
		history(`/wyszukaj/${term}`)
	}
	const onKeyDownHandler = e => {
		if (e.key === 'Enter') {
			search()
		}
	}

	const focusInput = () => {
		inputRef.current.focus()
	}

	useEffect(() => {
		focusInput()
	}, [])

	return (
		<div className='d-flex'>
			<input
				ref={inputRef}
				value={term}
				onKeyDown={onKeyDownHandler}
				onChange={e => setTerm(e.target.value)}
				className='form-control'
				type='text'
				placeholder='Szukaj...'
			/>
			<button
				onClick={search}
				className={`ms-1 btn btn-${theme.color}`}>
				Szukaj
			</button>
		</div>
	)
}

export default Searchbar
