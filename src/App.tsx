import { products } from "./data/products";

const App = () => {
  return (
    <div>
      {" "}
      <h1 className=" text-amber-300">e-commarece</h1>
      {products.map((product) => (
        <div>
          <h2>{product.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default App;
