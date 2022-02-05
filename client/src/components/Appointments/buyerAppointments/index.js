import {useEffect, useState} from "react";
import "./buyerAppointments.css"


const BuyerAppointments = () => {
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        getAppointments()
    }, [])

    const getAppointments = () => {
        const token = JSON.parse(sessionStorage.getItem("token"));

        fetch("http://localhost:5000/appointments/sender", {
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
                console.log(data)
                setAppointments(data.appointments)
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className="appointment-component">
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
                            provided by
                        </th>
                        <th>
                            date
                        </th>
                        <th>
                            state
                        </th>
                    </tr>

                    {appointments.map((appointment,i)=>(
                    <tr key={i}>
                        <td>
                            {i + 1}
                        </td>
                        <td>
                            {appointment.service.name}
                        </td>
                        <td>
                            {appointment.serviceOwner.username}
                        </td>
                        <td>
                            {new Date(appointment.date).toLocaleDateString("en-GB")}
                        </td>
                        <td>
                            {appointment.state}

                        </td>

                    </tr>))}
                </table>

                ):(
                <div>
                you have no appointments
                </div>


                )}
        </div>
    )
}

export default BuyerAppointments;