import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/GameProvider";
import './Home.css'

function Home() {
    const { logout } = useAuth();
  
    const handleLogout = (e) => {
      e.preventDefault();
      logout();
    };
  
    return (
      <div className="home">
        <header>
          <h1>VIDEOJUEGOS</h1>
        </header>
        <div className="container">
          <aside className="sidebar">
            <nav>
              <ul>
                <li><Link to="/nuevo" >Añadir juego </Link>
                <span class="icon">➕</span> </li>
                <li><Link to="/juegos">Ver juegos </Link>
                <span class="icon">🕹️</span> </li>
                <li><Link to="/about">About </Link>
                <span class="icon">ℹ️</span> </li>
                <li><Link to="/" onClick={handleLogout}>Logout </Link>
                    <span class="icon">🔌</span> 
                </li>
              </ul>
            </nav>
          </aside>
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }
  
  export default Home;