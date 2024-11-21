import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import "../../styles/common/Navbar.css";
import { ImCancelCircle } from "react-icons/im";
import SearchDialog from "./SearchDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);

  const handleChange = async (value) => {
    setInput(value);
    if(value.length >= 1){
      setShowSearchResult(true);
    try {
      const response = await fetch(`http://localhost:8080/api/product/search?keyword=${value}`)
      if(response.ok){
        const data = await response.json();
        setSearchResult(data);
        setNoResult(data.length === 0);
      }
    } catch (error) {
      console.log(error.message);
    }
  }else{
    setSearchResult([]);
    setNoResult(false);
    setShowSearchResult(false);
  }
  }

  return (
    <nav className=" navBar">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <p
          style={{
            fontWeight: "bold",
            color: "black",
            fontFamily: "fantasy",
            fontSize: "20px",
          }}
        >
          Shopping Cart
        </p>
      </Link>

      <div className=" navBarItems">
        <Link to={"/"} className=" navLinks">
          Products
        </Link>
        <Link to={"/about"} className=" navLinks">
          About
        </Link>
        <Link to={"/addProduct"} className=" navLinks">
          Add Product
        </Link>
        <Link to={"/cart"} className=" navLinks">
          Cart
        </Link>
        <div style={{position:"relative"}}>  
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "5px",
            borderWidth: "1px",
            borderStyle: "dashed",
            backgroundColor: "white",
          }}
        >
          <BiSearch />
          <input
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            className=" navBarSearch"
            placeholder="Search product.."
          />
        </div>
        {
                showSearchResult && (
                  <div className="searchTab">
                    {
                      searchResult.length > 0 ? (
                        searchResult.map((product) => (
                           <SearchDialog product={product} key={product.id} setShowResult={setShowSearchResult} setInput={setInput} />
                        ))
                      ):(
                        noResult && (
                          <div style={{padding:"10px", backgroundColor:"white", border:"1px solid"}}>
                          <p style={{textAlign:"center"}}>No Product found</p>
                        </div>
                        )
                      )
                    }
                  </div>
                )
              }
        </div>
      </div>
      <GiHamburgerMenu
        className=" hamburgermenue"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className=" drawerContainer">
          <div className="drawer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
              }}
            >
              <ImCancelCircle
                style={{ cursor: "pointer" }}
                size={25}
                onClick={() => setOpen(false)}
              />
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                padding: "5px",
                marginTop: "2rem",
              }}
            >
              <Link to={"/"} className=" navLinks">
                Products
              </Link>
              <Link to={"/about"} className=" navLinks">
                About
              </Link>
              <Link to={"/addProduct"} className=" navLinks">
                Add Product
              </Link>
              <Link to={"/cart"} className=" navLinks">
                Cart
              </Link>
              <div style={{position:"relative", backgroundColor:"white"}}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "5px",
                  borderWidth: "1px",
                  borderStyle: "dashed",
                  backgroundColor: "white",
                }}
              >
                <BiSearch />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                  className=" navBarSearch"
                  placeholder="Search product.."
                />
              </div>
              {
                showSearchResult && (
                  <div className="searchTab" style={{width:"100%"}}>
                    {
                      searchResult.length > 0 ? (
                        searchResult.map((product) => (
                           <SearchDialog product={product} key={product.id} setInput={setInput} setShowResult={setShowSearchResult} />
                        ))
                      ):(
                        noResult && (
                          <div style={{padding:"10px"}}>
                            <p style={{textAlign:"center"}}>No Product found</p>
                          </div>
                        )
                      )
                    }
                  </div>
                )
              }
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
