import style from './Menu.module.css'
import useAuth from '../../../hooks/useAuth.js'
import { NavLink, Link } from 'react-router-dom'

function Menu() {
	const [auth, setAuth] = useAuth()

	const logout = e => {
		e.preventDefault()
		setAuth(false)
	}

	return (
		<div className={`${style.menuContainer}`}>
			<ul className={style.menu}>
				<li className={style.menuItem}>
					<NavLink
						to='/'
						className={({ isActive }) => (isActive ? style.menuItemActive : style.menuItem)}>
						Home
					</NavLink>
				</li>
				{auth ? (
					<>
						<li className={style.menuItem}>
							<NavLink
								to='/profil'
								className={({ isActive }) => (isActive ? style.menuItemActive : style.menuItem)}>
								Mój profil
							</NavLink>
						</li>
						<li className={style.menuItem}>
							<a
								href='#section'
								onClick={logout}>
								Wyloguj
							</a>
						</li>
					</>
				) : (
					<>
						<li className={style.menuItem}>
							<NavLink to='/rejestracja'
								className={({ isActive }) => (isActive ? style.menuItemActive : style.menuItem)}>
								Zarejestruj
                            </NavLink>
						</li>
						<li className={style.menuItem}>
							<NavLink to='/zaloguj'
								className={({ isActive }) => (isActive ? style.menuItemActive : style.menuItem)}>
								Zaloguj
                            </NavLink>
						</li>
					</>
				)}
			</ul>
		</div>
	)
}

export default Menu
