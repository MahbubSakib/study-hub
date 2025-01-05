import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    return (
        <div className="bg-[#4A90E2]">
            <div className="navbar shadow-sm text-[#F8F8F8] w-10/12 mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex-1">
                    <Link to="/" className="flex gap-2 items-center">
                        <img className="w-auto h-7" src={logo} alt="" />
                        <span className="font-bold text-xl">StudyHub</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/assignments">Assignments</NavLink>
                        </li>
                    </ul>
                    <div className="ml-10">
                        {!user && (
                            <Link
                                to="/login"
                                className="bg-[#2B3440] px-3 py-2 rounded-md text-center text-white hover:bg-[#394455] transition duration-300"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                    {user && (
                        <div className="dropdown dropdown-end z-50">
                            <div className="flex items-center gap-2">
                                <div>
                                    <button
                                        onClick={logout}
                                        className="bg-white px-3 py-[6px] text-black rounded-md block text-center"
                                    >
                                        Logout
                                    </button>
                                </div>
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div title={user?.displayName} className="w-10 rounded-full">
                                        <img
                                            referrerPolicy="no-referrer"
                                            alt="User Profile Photo"
                                            src={user?.photoURL}
                                        />
                                    </div>
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content text-[#4A4A4A] mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
                            >
                                <li>
                                    <Link to="/create-assignments" className="justify-between">
                                        Create Assignments
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/my-attempted-assignments">
                                        My Attempted Assignments
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    {user && (
                        <div className="ml-3">
                            <Link
                                to="/pending-assignments"
                                className="bg-white text-black px-3 py-[6px] rounded-md block text-center"
                            >
                                Pending Assignments
                            </Link>
                        </div>
                        )}
                </div>
                    

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden bg-[#2B3440] p-2 rounded-md text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-[#4A90E2] z-40 p-4 shadow-md lg:hidden">
                        <ul className="space-y-3">
                            <li>
                                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/assignments" onClick={() => setIsMenuOpen(false)}>
                                    Assignments
                                </NavLink>
                            </li>
                            {user && (
                                <>
                                    <li>
                                        <Link
                                            to="/create-assignments"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Create Assignments
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/my-attempted-assignments"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            My Attempted Assignments
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="bg-[#2B3440] px-3 py-2 rounded-md text-white w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                            {!user && (
                                <li>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="bg-[#2B3440] px-3 py-2 rounded-md text-white w-full text-left"
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                            {user && (
                                <li>
                                    <Link
                                        to="/pending-assignments"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="bg-white text-black px-3 py-2 rounded-md block"
                                    >
                                        Pending Assignments
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
                <div className='ml-2'>
                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onChange={handleToggle} />

                        {/* sun icon */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
