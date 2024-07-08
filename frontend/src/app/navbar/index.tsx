import { Link } from "react-router-dom";
import { useAuth } from '../../context/useAuth';
interface Props { }

const Navbar = (props: Props) => {
    const { isLoggedIn, user, logout } = useAuth();
    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        Inicio
                    </Link>
                </div>
                {isLoggedIn() ? (
                    <div className="hidden lg:flex items-center space-x-6 text-back">
                        <div className="hover:text-darkBlue">Welcome, {user?.username}</div>
                        <a
                            onClick={logout}
                            className="px-8 py-3 font-bold rounded bg-lightGreen hover:opacity-70 cursor-pointer"
                        >
                            Logout
                        </a>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center space-x-6 text-back">
                        <Link to="/login" className="px-8 py-3 font-bold rounded bg-lightGreen hover:opacity-70">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-8 py-3 font-bold rounded bg-lightGreen hover:opacity-70"
                        >
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;