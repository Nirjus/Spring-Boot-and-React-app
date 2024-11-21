/* eslint-disable react/display-name */
import Navbar from './Navbar'
import "../../styles/common/CommonLayout.css"
const CommonLayout = () => (Wrapper) => {
  return (props) => {
    return(
        <div>
            <Navbar />
            <div className=' mainContainer'>
            <Wrapper props={props} />
            </div>
        </div>
    )
  }
}

export default CommonLayout