import React from 'react';
import AppViewer from "../components/AppViewer";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import apps from "../pages/Apps/Apps.json"
function Apps() {
    document.title = "Apps";
    const listOfApps = apps.data;
    function renderApps() {
        return listOfApps.map((app)=>{
            return(
                <div className="appSection">
                    <h2 class="text-xl my-3 font-bold">{app.appName}</h2>
                    <h4>{app.description}</h4>
                    <AppViewer appStore={app.appStoreLink} googlePlay={app.googlePlayLink}/>
                    <h5>{app.madeWith}</h5>
                </div>
            )
        })
    }
    return (
        <>
            <NavBar/>
            <div className="Page">
                <h1 class="text-4xl my-5 font-bold">Apps</h1>
                <div className="appSectionCon">
                    {renderApps()}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Apps;
