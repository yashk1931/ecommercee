import '../../navbar.css';

const products = [
    {
        name: "GraceLine",
        brand: "Nerine",
        price: "150",
        image: "/pictures/wlo1.jpg",
    },
    {
        name: "ClassicFemme",
        brand: "Lunora",
        price: "220",
        image: "/pictures/wlo2.jpg",
    },
    {
        name: "Serenelle",
        brand: "Vans",
        price: "65",
        image: "/pictures/wlo3.jpg",
    },
    {
        name: "Evelisse",
        brand: "Solene",
        price: "70",
        image: "/pictures/wlo4.jpg",
    },
    {
        name: "Marvella",
        brand: "Elvaya",
        price: "110",
        image: "/pictures/wlo5.jpg",
    },
    {
        name: "Lustre",
        brand: "Vayra",
        price: "90",
        image: "/pictures/wlo6.jpg",
    },
];

export default function Sneakers({ addtocart }) {
  return (
     <>
    <section className="products">
      <h2>Featured Sneakers</h2>

      <div className="product-grid">
        {products.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt={item.name} />
            <div className="card-content">
            <h3>{item.name}</h3>
            <p>{item.brand}</p>
            <p className="price">${item.price}</p>
            <button onClick={() => addtocart(item)} className="add-btn">
              Add to Cart
            </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    <footer>
        &copy; <span id="year"></span> SneakerShop — Designed by NxStep
    </footer>
    </>
  );
}
