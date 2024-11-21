/* eslint-disable react/prop-types */
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

function SearchDialog({ product, setShowResult, setInput, }) {
 function handleSetOff(){
  setShowResult(false);
  setInput("");
 }
  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="searchProduct" onClick={handleSetOff}>
        <img
          src={`data:${product?.imageType};base64,${product?.imageData}`}
          alt="product-image"
          style={{
            width: "60px",
            height: "50px",
            objectFit: "cover",
            margin: "auto",
          }}
        />
        <div style={{ margin: "auto" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontWeight: "bolder",
              fontSize: "15px",
              color: "black",
              textDecoration: "underline",
            }}
          >
            {product?.name}
          </p>
          <p
            style={{ fontFamily: "monospace", fontSize: "12px", color: "grey" }}
          >
            by {product?.brand}
          </p>
        </div>
        <div
          style={{
            padding: "10px",
            border: "0px",
            borderRadius: "99px",
            backgroundColor: "tan",
            width: "40px",
            height: "40px",
            margin: "auto",
          }}
        >
          <MdOutlineArrowOutward color="white" size={20} />
        </div>
      </div>
    </Link>
  );
}

export default SearchDialog;
