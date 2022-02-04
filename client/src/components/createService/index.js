import "./createServer.css";
import {useNavigate, useLocation} from "react-router-dom";
import {useState} from "react";


const CreateService = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const res = await fetch("http://localhost:5000/services/",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name: serviceName,
                serviceProvider: state,
                price: parseInt(price),
                description,
                image
            })
        });
        const data = await res.json();

        if (res.ok){
            navigate("/")
        }else{
            console.log(data.message)
        }
    }

    return (
        <div className="create-service-component">
            <h2>Create a service</h2>
            <form className="service-form" onSubmit={handleSubmit}>
                <label htmlFor="serviceName">Service Name</label>
                <input type="text" className="inp-primary" placeholder={"enter your service name"} name="serviceName" onChange={event => setServiceName(event.target.value)}/>

                <label htmlFor="price">Price</label>
                <input type="text" className="inp-primary" placeholder={"enter service price"} name="price" onChange={event => setPrice(event.target.value)}/>

                <label htmlFor="description">Service description</label>
                <input type="text" className="inp-primary" placeholder={"describe your service"} name="description" onChange={event => setDescription(event.target.value)}/>

                <label htmlFor="image">image</label>
                <input type="text" className="inp-primary" placeholder={"enter an image link for your service"} name="image" onChange={event => setImage(event.target.value)}/>

                <input type="submit" className="btn-submit" value={"Login"}/>
            </form>
        </div>
    )
}

export default CreateService;