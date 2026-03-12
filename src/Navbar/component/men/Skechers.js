import '../../navbar.css';

const products = [
    {
        name: "AeroFlexAdidas Forum Low",
        brand: "Nike",
        price: "150",
        image: "/pictures/sk1.jpg",
    },
    {
        name: "Adidas Forum Low",
        brand: "Adidas",
        price: "220",
        image: "/pictures/sk2.jpg",
    },
    {
        name: "SwiftRun",
        brand: "Vans",
        price: "65",
        image: "/pictures/sk3.jpg",
    },
    {
        name: "FlexWave",
        brand: "Converse",
        price: "70",
        image: "/pictures/sk4.jpg",
    },
    {
        name: "UltraWalk",
        brand: "Nike",
        price: "110",
        image: "/pictures/sk5.jpg",
    },
    {
        name: "CloudStride",
        brand: "Adidas",
        price: "90",
        image: "/pictures/sk6.jpg",
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
