import axios from "axios";
import { useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/Loadingbox";
import MessageBox from "../components/MessageBox";
//import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH REQUEST":
      return { ...state, loading: true };
    case "FETCH SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.messeage });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>The Clothing Store</title>
      </Helmet>

      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
