import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton'
import axios from '../../axios-auth'

export default function Login(props) {
	const [auth, setAuth] = useAuth()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [valid, setValid] = useState(null)
	const [error, setError] = useState('')

	const submit = async e => {
		e.preventDefault()
		setLoading(true)

		try {
			const res = await axios.post('/accounts:signInWithPassword', {
				email,
				password,
				returnSecureToken: true,
			})
			setAuth({
				email: res.data.email,
				token: res.data.idToken,
				userId: res.data.localId,
			})
			navigate('/')
		} catch (ex) {
			setError(ex.response.data.error.message)
			console.log(ex.response)
			setLoading(false)
		}
	}

	useEffect(() => {
		if (auth) {
			navigate('/')
		}
	}, [auth, navigate])

	return (
		<div>
			<h2>Logowanie</h2>

			{valid === false ? <div className='alert alert-danger'>Niepoprawne dane logowania</div> : null}
			<form onSubmit={submit}>
				<div className='form-group'>
					<label className='mt-2'>Email</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<label className='mt-3'>Hasło</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='form-control'
					/>
				</div>

				{error ? <div className='alert alert-danger mt-3'>{error}</div> : null}

				<LoadingButton loading={loading}>Zaloguj</LoadingButton>
			</form>
		</div>
	)
}
