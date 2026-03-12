import '../../navbar.css';

const products = [
    {
        name: "GraceStep",
        brand: "Vellia",
        price: "150",
        image: "/pictures/wSn1.jpg",
    },
    {
        name: "FemmeFlex",
        brand: "Liora",
        price: "220",
        image: "/pictures/wsn3.jpg",
    },
    {
        name: "RoyalEase",
        brand: "Avena",
        price: "65",
        image: "/pictures/wsn4.jpg",
    },
    {
        name: "SilkStride",
        brand: "Converse",
        price: "70",
        image: "/pictures/wsn5.jpg",
    },
    {
        name: "PureComfort",
        brand: "Nelia",
        price: "110",
        image: "/pictures/wsn6.jpeg",
    },
    {
        name: "LuxeRunner",
        brand: "Arista",
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
