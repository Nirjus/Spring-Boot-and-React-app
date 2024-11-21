import { useState } from 'react'
import CommonLayout from '../components/common/CommonLayout'
import "../styles/page/ProductAddPage.css"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProductAddPage() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name:"",
        price:0,
        desc: "",
        brand:"",
        quantity:0,
        releaseDate:"",
        available: false,
        category:""
    })
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if(fileReader.readyState === 2){
                setImagePreview(fileReader.result);
            }
        }
        fileReader.readAsDataURL(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(product.name === "" || product.brand === "" || product.category === "" || product.desc == "" || product.price === 0 || product.quantity === 0 || product.releaseDate === "" || image === ""){
                toast.error("Please fill all the fields")
                return;
            }
            const formData = new FormData();
            formData.append("imageFile", image);
            formData.append("product", new Blob([JSON.stringify(product)],{type:"application/json"}));

            const response = await fetch("http://localhost:8080/api/product", {
                method:"POST",
                body: formData
            })
            if(response.ok){
                const data = await response.json();
                console.log(data);
                toast.success("Product added successfully");
                navigate(`/product/${data?.id}`);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div>

        <h1 style={{
            fontFamily:"fantasy",
            fontWeight:"bold",
            fontSize:"35px",
            textAlign:"center",
            marginTop:"35px",
        }}>Add Your Product</h1>
        <br />
        <br />

        <form onSubmit={handleSubmit} className=' formClass'>
        <div className=' subInputClass'>
        <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            width:"100%"
         }}>
          <label htmlFor="name" className=' labelText'> Product Name</label>
          <input type="text" name="name" id="name" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className='inputClass' placeholder='Enter product name' />
         </div>
         <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            width:"100%"
         }}>
          <label htmlFor="brand" className=' labelText'> Product Brand</label>
          <input type="text" name="brand" id="brand" value={product.brand} onChange={(e) => setProduct({...product, brand: e.target.value})} className='inputClass' placeholder='Enter the brand' />
         </div>
        </div>
        <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            width:"100%",
            marginBottom:"20px"
         }}>
          <label htmlFor="desc" className=' labelText'> Product Description</label>
          <textarea rows={5} name="desc" id="desc" value={product.desc} onChange={(e) => setProduct({...product, desc: e.target.value})} className='inputClass' placeholder='Enter description' />
         </div>
         <div className=' subInputClass'>
        <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            width:"100%"
         }}>
          <label htmlFor="price" className=' labelText'> Price</label>
          <input type="number" name="price" id="price" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} className='inputClass' placeholder='Enter product price' />
         </div>
         <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            width:"100%"
         }}>
          <label htmlFor="category" className=' labelText'> Product Category</label>
          <select name="category" id="category" value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})} className=' inputClass'>
            <option value="Electronics">Electronics</option>
            <option value="Car">Car</option>
            <option value="Garments">Garments</option>
            <option value="Sports">Sports</option>
          </select>
         </div>
        </div>
        <div className=' subInputClass'>
        <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            width:"100%"
         }}>
          <label htmlFor="stock" className=' labelText'> Stock</label>
          <input type="number" name="stock" id="stock" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})} className='inputClass' placeholder='Enter stock' />
         </div>
         <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            width:"100%"
         }}>
          <label htmlFor="date" className=' labelText'>Release Date</label>
          <input type="date" name="date" id="date" value={product.releaseDate} onChange={(e) => setProduct({...product, releaseDate: e.target.value})} className='inputClass' placeholder='Enter date' />
         </div>
         <div style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:"10px",
            width:"100%"
         }}>
          <input type="checkbox" name="available" id="available" value={product.available} onChange={(e) => setProduct({...product, available: e.target.checked})} />
          <label htmlFor="available" className=' labelText'>Product Available</label>
         </div>
        </div>
        <div style={{
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            width:"100%"
         }}>
          <label htmlFor="image" className=' labelText'> Image</label>
          <input type="file" accept='image/*' name="image" id="image" onChange={handleImageChange} className='inputClass' placeholder='Enter stock' />
         </div>
          {
            imagePreview && (
                <div style={{marginTop:"20px"}}>
                    <img src={imagePreview} alt="preview-image" style={{
                        width:"400px",
                        height:"100%",
                        objectFit:"contain",
                        borderRadius:"10px",
                        border:"0px"
                    }} />
                </div>
            )
          }
         <button type="submit" className=' sendBtn'>
            Create Product
         </button>
        </form>
        
    </div>
  )
}

export default CommonLayout()(ProductAddPage)