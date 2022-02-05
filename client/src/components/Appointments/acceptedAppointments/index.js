import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";


const AcceptedAppointments = () => {
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        getAppointments()
    }, [])

    const getAppointments = () => {
        const token = JSON.parse(sessionStorage.getItem("token"));

        fetch("http://localhost:5000/appointments/accepted", {
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
                console.log(err.message)
            })

    }
    return (
        <div className="appointment-component">
            <ToastContainer/>
                <h2>Accepted Appointments</h2>
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

export  default AcceptedAppointments;