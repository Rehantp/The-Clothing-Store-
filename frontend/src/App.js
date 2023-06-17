import data from "./data";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">The Clothing Store</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.slug}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
