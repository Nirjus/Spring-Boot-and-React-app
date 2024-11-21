/* eslint-disable react/prop-types */
import { IoIosArrowDroprightCircle } from "react-icons/io"
import "../../styles/common/ProductCard.css"
import { Link } from "react-router-dom"

function ProductCard({product}) {
  return (
    <div className="cardContainer">
      <img src={`data:${product?.imageType};base64,${product?.imageData}`} alt="iamge-data" style={{
        width:"100%",
        height:"200px",
        objectFit:"contain",
        borderRadius:"10px",
        border:"0px"
      }} />
     <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between", alignItems:"center"}}>
     <div>
       <h2 className="cardHeader">{product.name}</h2>
        <p>by {product.brand}</p>
        <h3>₹{product.price}</h3>
       </div>
       <Link to={`/product/${product.id}`} style={{textDecoration:"none"}}>
       <button type="button" style={{
        padding:"10px",
        borderRadius:"5px",
        border:"0px",
        cursor:"pointer",
        display:"flex",
        gap:"10px",
        alignItems:"center",
        fontSize:"15px"
      }} >
        visit <IoIosArrowDroprightCircle size={20} />

      </button>
       </Link>
     </div>
        <button type="button" style={{
            backgroundColor:"blue",
            border:"0px",
            color: "white",
            padding:"10px 20px",
            borderRadius: "20px",
            marginTop: "10px",
            cursor:"pointer",
            fontWeight:"bolder"
        }}>
            Add To Cart
        </button>
    </div>
  )
}

export default ProductCard