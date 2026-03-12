import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="banner">
        <div className="container">
          <h1>Step Up Your<span id="style"> Style</span></h1>
          <p className="para">Explore the latest drops from Nike, Adidas, Vans, and Converse — designed for comfort and
            performance.</p>
          <button className="Bshop">Shop Now</button>
        </div>
      </main>

      <div className="cards">
        <div className="companycard">
          <Link to='/men/skechers' onClick={() => window.scrollTo(0, 0)}>
            <img src="/pictures/NeoTrek.jpg" alt="NeoTrek Shoes" />
          </Link>
        </div>

        <div className="companycard">
          <Link to='/men/sneakers' onClick={() => window.scrollTo(0, 0)}>
            <img src="/pictures/PeakFlex.jpg" alt="PeakFlex Sneakers" />
          </Link>
        </div>

        <div className="companycard">
          <Link to='/men/formal' onClick={() => window.scrollTo(0, 0)}>
            <img src="/pictures/VeloSole.jpg" alt="VeloSole Formal Shoes" />
          </Link>
        </div>

        <div className="companycard">
          <Link to='/men/sneakers' onClick={() => window.scrollTo(0, 0)}>
            <img src="/pictures/Flexon01.jpg" alt="Flexon Sneakers" />
          </Link>
        </div>

        <div className="companycard">
          <Link to='/women/formal' onClick={() => window.scrollTo(0, 0)}>
            <img src="/pictures/PrimeWalk.jpg" alt="PrimeWalk Women's Formal Shoes" />
          </Link>
        </div>

        <div className="companycard">
          <Link to='/men/formal' onClick={() => window.scrollTo(0, 0)}>
            <img src="/pictures/CoreStep.jpg" alt="CoreStep Formal Shoes" />
          </Link>
        </div>
      </div>
      <footer>
        &copy; <span id="year"></span> SneakerShop — Designed by NxStep
      </footer>
    </>
  );
};