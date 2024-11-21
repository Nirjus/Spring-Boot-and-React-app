import { useEffect, useState } from 'react';
import CommonLayout from '../components/common/CommonLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "../styles/page/ProductPage.css"
import { BiCategoryAlt } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import toast from 'react-hot-toast';

function ProductPage() {
    const param = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDeleteProduct = async (toastId) => {
        try{
           const response = await fetch(`http://localhost:8080/api/product/${param?.prodId}`,{
            method:"DELETE"
           })
           if(response.ok){
            const message = await response.text();
            toast.success(message);
            toast.dismiss(toastId);
            navigate("/");
           }
        }catch(error){
            console.log(error.message);
        }
    }

    useEffect(() => {
     async function fetchData(){
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/product/${param?.prodId}`);
        if(response.ok){
            const data = await response.json();
            setProduct(data);
        }
      } catch (error) {
        console.log(error.message);
      }finally{
        setLoading(false);
      }
     }
     fetchData();
    },[param?.prodId])

    if(loading){
        return(
            <h1 style={{
                widthL:"100%",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                marginTop:"25px"
            }}>Loading..</h1>
        )
    }

  return (
    <div className='productPageConatainer'>
        <div style={{display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"space-between"}}>
      <div>
      <h1 className=' productHeader'>{product?.name}</h1>
       <h2 className=' productBrand'> {product?.brand} </h2>
       <div style={{display:"flex", alignItems:"center", rowGap:"10px"}}>
       <BiCategoryAlt size={24} color='blue' />
       <p className='productCategory'>{product?.category}</p>
       </div>
       <p className=' productDesc'>{product?.desc}. (release date: {product?.releaseDate}) </p>
      </div>
       <img src={`data:${product?.imageType};base64,${product?.imageData}`} alt="iamge-data" style={{
        width:"100%",
        height:"200px",
        objectFit:"contain",
        borderRadius:"10px",
        border:"0px"
      }} />
</div>
       <hr />
       <br />
     <div>
     <p className=' priceProduct'>Price: <span style={{
        color:"green"
       }}>
       ₹{product?.price}
        </span> </p>
     </div>
     <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start", gap:"20px"}}>
        {
            product?.quantity > 0 ? (

                <p className='productQuantity' style={{color:"gray"}}>Quantity: {product?.quantity} </p>
            ):(
                <p className='productQuantity' style={{color:"red"}}>Out of stock</p>
            )
        }
        <div style={{
            padding:"8px 15px",
            backgroundColor: product?.available ? "green" : "orange",
            borderRadius:"10px",
            border:"0px",
            width:"fit-content",
        }}>
            <p style={{color:"white", fontFamily:"cursive"}}>{ 
            product?.available ? "Product available" : "Product Not available"
            }
            </p>
        </div>
     </div>
    <div style={{
        width:"100%",
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
        marginTop:"15px",
        gap:"15px"
    }}>
    <Link to={`/product/update/${product?.id}`}>
    <button className='crudBtn' type="button">
        Update <FiEdit />
     </button>
    </Link>
    <button className='crudBtn' style={{backgroundColor:"black", color:"white"}} type="button"
    onClick={() => {
        toast((t) => (
            <div style={{ display:"flex", flexDirection:"column", gap:"15px"}}>
             are you sure you want to delete ?
             <div style={{width:"100%", display:"flex", justifyContent:"flex-end", alignItems:"center", gap:"10px"}}>
             <button type="button" onClick={() => handleDeleteProduct(t.id)} style={{border:"0px", borderRadius:"5px", padding:"5px 10px", fontFamily:"monospace", color:"white", backgroundColor:"lime"}}>
                Yes
             </button>
              <button onClick={() => toast.dismiss(t.id)} style={{border:"0px", borderRadius:"5px", padding:"5px 10px", fontFamily:'monospace', color:"white", backgroundColor:"indigo"}}>
                No
              </button>
             </div>
            </div>
          ));
    }}
    >
        Delete <AiOutlineDelete />

    </button>
    </div>
    </div>
  )
}

export default CommonLayout()(ProductPage)