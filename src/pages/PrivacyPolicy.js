 import React,{ useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import data from "../privacyPolicy/ppList.json";
import ReactMarkdown from 'react-markdown';
import "../pages/PrivacyPolicy.css"
import Footer from "../components/Footer";
function PrivacyPolicy() {
    document.title = "Loading...";
    const pageTitle = useRef();
    const pageSubtitle = useRef();
    const [pageContent, setPageContent] = useState("");
    var pathName = window.location.pathname.substring(1)?.split('/')[1];
    const ppInfo = data.privacyPolicies.find((value)=>pathName===value.name);
    if(ppInfo){
        document.title =ppInfo.name+" Policy";
    }else{
        document.title = "Policy Not Found";
    }

    async function getDocs(docPath) {
        var docsText = await (await fetch(docPath)).text();
        setPageContent(docsText);
    }

    useEffect(()=>{
        if(ppInfo){
            pageTitle.current.innerText = ppInfo.name;
            var docPath;
            if(ppInfo.legacy){
                docPath =require('../privacyPolicy/'+ppInfo.name+".htm");
            }else{
               docPath=require('../privacyPolicy/'+ppInfo.name+".md");
            }
            getDocs(docPath);
        }else{
            pageTitle.current.innerText = "Policy Not Found";
        }
    }, [])
    return (
        <>
            <NavBar/>
            <div className="Page">
                <h1 ref={pageTitle}>Loading...</h1>

                {pageContent != "" && ppInfo.legacy ? <div className="legacyFormat" dangerouslySetInnerHTML={{ __html: pageContent }}></div>: undefined}
                {pageContent != "" && !ppInfo.legacy ? <ReactMarkdown children={pageContent} />: undefined}
            </div>
            <Footer/>
        </>
    );
}

export default PrivacyPolicy;
