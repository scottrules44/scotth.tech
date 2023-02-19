import NavBar from "../components/NavBar";
import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
function ErrorHandlePage() {
    document.title = "Loading...";
    var loadingRef = useRef();
    //check backwards compatility with old website for plugin docs
    useEffect(()=>{
        var pathName = window.location.pathname.substring(1);
        if(pathName.includes("plugin-")){
            window.location.href = "/"+pathName.replace("-", "/");
        }else{
            //Show Standard Error
            loadingRef.current.innerText = "Page Not Found"
        }
    }, [])
    return (
        <>
            <NavBar/>
            <h3 ref={loadingRef}>Loading...</h3>
            <Footer/>
        </>
    );
}

export default ErrorHandlePage;