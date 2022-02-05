import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";


const HomeRedirector = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const token = sessionStorage.getItem("token");

    if (token){
      handleAppRedirect()
    }else {
      navigate("/login")
    }
  })

  const handleAppRedirect = async ()=>{
    const token = JSON.parse(sessionStorage.getItem("token"))

    const res = await fetch("http://localhost:5000/userType",{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    const data = await res.json();

    if(res.ok){
      if (data.userType === "buyer"){
        navigate("/appointments/buyer")
      } else if (data.userType === "seller"){
        navigate("/appointments/seller")
      }
      console.log(data)
    } else {
      toast.error("an error occurred, try again")
    }
  }

  return null
}


export default HomeRedirector;