import "./modal.css"
import {FaWindowClose} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";


const Modal = ({show, service, setShow}) => {
    const navigate= useNavigate();
    if (!show) {
        return null
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const token = JSON.parse(sessionStorage.getItem("token"))
        const date = new FormData(e.target).get("date")
        const res = await fetch("http://localhost:5000/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                serviceOwner: service.serviceProvider,
                service: service._id,
                date
            })
        })
        const data = await res.json();

        if (res.ok){
            navigate("/appointments/buyer")
            setShow(false)
        } else{
           toast.error(data.message)
        }
    }

    return (
        <div className="modal" onClick={()=>setShow(false)}>
            <ToastContainer/>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <FaWindowClose className="close-icon" onClick={()=>setShow(false)}/>
                    <h2>book an appointment</h2>
                </div>
                <div className="modal-body">
                    <form className="modal-form" onSubmit={handleSubmit}>
                        <label htmlFor="service">for </label>
                        <input type="text" name="service" id="service" value={service.name} disabled={true} className="modal-form-input"/>
                        <label htmlFor="price">price:</label>
                        <input type="number" name="price" id="price" value={service.price} disabled={true} className="modal-form-input"/>
                        <label htmlFor="date">pick a date</label>
                        <input type="date" name="date" id="date" className="modal-form-input" />
                        <input type="submit" name="submitAppointment" id="submitAppointment"
                        value="confirm" className="btn-reserve"/>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default Modal