import { useEffect, useState } from "react";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setpage] = useState(1);
  const handleProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
  };
  const handlePrevious = () => {
    setpage((prevpage) => prevpage - 1);
  };
  const handlenext = () => {
    setpage((prevpage) => prevpage + 1);
  };
  const selectedPage = (page_index) => {
    setpage(page_index);
  };
  useEffect(() => {
    handleProducts();
  }, []);
  return (
    <>
      <div className="container">
        {products.length > 0 &&
          products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <div className="product__single">
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </div>
            );
          })}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={`pages ${page > 1 ? "" : "pagedisabled"}`}
            onClick={() => handlePrevious()}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                onClick={() => {
                  selectedPage(i + 1);
                }}
                className={`${page === i + 1 ? "page_Selected" : ""}`}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={`pages ${
              page === products.length / 10 ? "pagedisabled" : ""
            }`}
            onClick={() => handlenext()}
          >
            ▶️
          </span>
        </div>
      )}
    </>
  );
};

export default Pagination;
