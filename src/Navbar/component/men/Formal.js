import '../../navbar.css';

const products = [
    {
        name: "ClassicStride",
        brand: "Velano",
        price: "150",
        image: "/pictures/lo1.jpg",
    },
    {
        name: "RoyalStep",
        brand: "Mavero",
        price: "220",
        image: "/pictures/lo2.jpg",
    },
    {
        name: "NobleFlex",
        brand: "Zarella",
        price: "65",
        image: "/pictures/lo3.jpg",
    },
    {
        name: "EliteMotion",
        brand: "Solenne",
        price: "70",
        image: "/pictures/lo4.jpg",
    },
    {
        name: "RegalWalk",
        brand: "Verden",
        price: "110",
        image: "/pictures/lo5.jpg",
    },
    {
        name: "SignatureStride",
        brand: "Lustro",
        price: "90",
        image: "/pictures/lo6.jpg",
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
