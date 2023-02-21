import '../components/NavBar.css';
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react';
function NavBar(){
    var homeRef = useRef();
    homeRef.navTo = "/";
    var appRef = useRef();
    appRef.navTo = "/apps";
    var projectRef = useRef();
    projectRef.navTo = "/projects";
    var pluginsRef = useRef();
    pluginsRef.navTo = "/plugins";
    var contactRef = useRef();
    contactRef.navTo = "/contact";
    useEffect(() => {
        homeRef.current.onclick = ()=>{
            window.location.href = homeRef.navTo;
        }
        appRef.current.onclick = ()=>{
            window.location.href = appRef.navTo;
        }
        projectRef.current.onclick = ()=>{
            window.location.href = projectRef.navTo;
        }
        pluginsRef.current.onclick = ()=>{
            window.location.href = pluginsRef.navTo;
        }
        contactRef.current.onclick = ()=>{
            window.location.href = contactRef.navTo;
        }

        if(window.location.pathname == homeRef.navTo){
            homeRef.current.className="button active";
        }
        if(window.location.pathname == appRef.navTo){
            appRef.current.className="button active";
        }
        if(window.location.pathname == projectRef.navTo){
            projectRef.current.className="button active";
        }
        if(window.location.pathname == pluginsRef.navTo){
            pluginsRef.current.className="button active";
        }
        if(window.location.pathname == contactRef.navTo){
            contactRef.current.className="button active";
        }

    });

    return(
        <div id="navBar">
            <div className="logo" >

                <a href='/'><img style={{marginRight:"20px"}} src={require("../assets/mylogo.png")} width={100} height={100}/></a>
                <h1 id="title">Scott H Tech</h1>
            </div>
            <div id="buttonGroup">
                <div className="button" ref={homeRef}><a>Home</a></div>
                <div className="button" ref={appRef}><a>Apps</a></div>
                <div className="button" ref={projectRef}><a>Projects</a></div>
                <div className="button" ref={pluginsRef}><a>Plugins</a></div>
                <div className="button" ref={contactRef}><a>Contact/About</a></div>
            </div>
        </div>
    )
}
export default NavBar;
