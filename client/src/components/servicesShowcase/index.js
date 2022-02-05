import {useEffect, useState} from "react";
import "./servicesShowcase.css";
import {useSearchParams} from "react-router-dom";
import Modal from "../modal";

const ServicesShowcase = () => {
    const [searchParams] = useSearchParams()

    const [services, setServices] = useState([]);
    const [show, setShow] = useState(false);
    const [reservedService, setReservedService] = useState();

    useEffect(() => {
        if (!searchParams.get("search")) {
            fetch("http://localhost:5000/services", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(res => res.json())
                .then(data => {
                    setServices(data.services)
                }).catch(err => {
                console.log(err)
            })
        } else {
            searchServices(searchParams.get("search"))
        }
    }, [])

    const searchServices = async (query) => {
        const res = await fetch(`http://localhost:5000/services/searchName?name=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();

        if (res.ok) {
            setServices(data.services)
        } else {
            console.log(data)
        }

    }

    return (
        <>
            <div className="showcase-component">
                {services ? services.map((service, i) => (
                    <div className="service-card-body" key={i}>
                        <img src={service.image} alt={service.name} className="img-service"/>
                        <span>service: {service.name}</span>
                        <span>provider: {service.serviceProvider.username}</span>
                        <span>price: {service.price}</span>
                        <button className="btn-reserve" onClick={()=>{
                            setReservedService(service);
                            setShow(true);
                        }}>reserve</button>
                    </div>
                )) : (
                    <div>
                        <h1>
                            no results found
                        </h1>
                    </div>
                )}
            </div>
            <Modal show={show} service={reservedService} setShow={setShow}/>
        </>
    )
}


export default ServicesShowcase;