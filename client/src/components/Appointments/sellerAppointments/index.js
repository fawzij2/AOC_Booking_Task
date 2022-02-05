import {useEffect, useState} from "react";
import {FaCheck} from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5";
import "./sellerAppointments.css"
import {ToastContainer, toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const SellerAppointments = () => {
    const navigate= useNavigate();

    const [appointments, setAppointments] = useState();

    useEffect(() => {
        getAppointments()
    }, [])

    const getAppointments = () => {
        const token = JSON.parse(sessionStorage.getItem("token"));

        fetch("http://localhost:5000/appointments/pending", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                setAppointments(data.appointments)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const handleAcceptReject = async (str,id) =>{
        const token = JSON.parse(sessionStorage.getItem("token"));

        const res = await fetch(`http://localhost:5000/appointments?appointmentId=${id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                state: str
            })
        })

        if (res.ok){
            getAppointments()
        }else {
            toast.error("something went wrong, please trye again")
        }

    }

    return (
        <div className="appointment-component">
            <ToastContainer/>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
            }}>
            <h2>Pending Appointments</h2>
                <button className="btn-nav-accepted" onClick={()=>{
                    navigate("/appointments/seller/accepted")
                }}>go to accepted appointments</button>
            </div>
            {appointments ? (
                <table className="table-appointment">
                    <tr className="table-main-row">
                        <th>
                            No.
                        </th>
                        <th>
                            service name
                        </th>
                        <th>
                            booked by
                        </th>
                        <th>
                            date
                        </th>
                        <th>
                            state
                        </th>
                    </tr>

                    {appointments.map((appointment, i) => (
                        <tr key={i}>
                            <td>
                                {i + 1}
                            </td>
                            <td>
                                {appointment.service.name}
                            </td>
                            <td>
                                {appointment.requestSender.username}
                            </td>
                            <td>
                                {new Date(appointment.date).toLocaleDateString("en-GB")}
                            </td>
                            <td>
                                {appointment.state}
                            </td>
                            <td className="accept-reject-cell">
                                <div className="btn-accept" onClick={()=>{
                                    handleAcceptReject("accepted", appointment._id)
                                }}>
                                    accept <FaCheck/>
                                </div>
                            </td>
                            <td className="accept-reject-cell">
                                <div className="btn-reject" onClick={()=>{
                                    handleAcceptReject("declined", appointment._id)
                                }}>
                                    decline <IoCloseSharp/>
                                </div>
                            </td>
                        </tr>))}
                </table>

            ) : (
                <div>
                    you have no pending appointments at the moment
                </div>


            )}
        </div>
    )
}

export default SellerAppointments;