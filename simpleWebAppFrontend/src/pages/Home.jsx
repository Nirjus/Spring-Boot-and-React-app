import CommonLayout from '../components/common/CommonLayout'
import "../styles/ui/Home.css"
import { useEffect, useState } from 'react'
import ProductCard from '../components/common/ProductCard';
function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
    async function fetchData(){
        try {
            const response = await fetch("http://localhost:8080/api/products");
            const data = await response.json();
            if(response.ok){
                setProducts(data); 
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchData();
    },[])
    
  return (
    <div className=' homeContainer'>
        <h1 style={{fontFamily:"cursive", fontSize:"20px", fontWeight:"bolder", textAlign:"center"}}>Products</h1>
        <br />
       <div className=' productSpace'>
       {
            products && products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))
        }
       </div>
       {
        products.length === 0 &&(
            <p style={{
             width:"100%",
              display:"flex",
               alignItems:"center",
               justifyContent:"center",
               marginTop:"50px",
               fontSize:"20px",
               color:"black"
            }}>
                No products have!
            </p>
        )
       }
    </div>
  )
}

export default CommonLayout()(Home)
