import React,{ useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import data from "../pluginDocs/pluginList.json";
import ReactMarkdown from 'react-markdown';
import "../pages/PluginDoc.css"
import Footer from "../components/Footer";
function PluginDoc() {
    document.title = "Loading...";
    const pageTitle = useRef();
    const pageSubtitle = useRef();
    const [pageContent, setPageContent] = useState("");
    var pathName = window.location.pathname.substring(1);
    const pluginKey = pathName.replace("/", "-");
    var pluginInfo;
    if(data.plugins[pluginKey]){
        pluginInfo = data.plugins[pluginKey];
        document.title =pluginInfo.name+" Plugin";
    }else{
        document.title = "Plugin Not Found";
    }

    async function getDocs(docPath) {
        var docsText = await (await fetch(docPath)).text();
        setPageContent(docsText);
    }

    useEffect(()=>{
        if(pluginInfo){
            pageTitle.current.innerText = pluginInfo.name;
            pageSubtitle.current.innerText = "Solar2D Plugin Docs";
            var docPath;
            if(pluginInfo.legacyFormat){
              docPath = require('../pluginDocs/'+pluginKey+".htm");
            }else{
               docPath = require('../pluginDocs/'+pluginKey+".md");
            }
            getDocs(docPath);
        }else{
            pageTitle.current.innerText = "Plugin Not Found";
            pageSubtitle.current.innerHtml = `<a href="/plugins">View All Plugins</a>`;
        }
    }, [])
    return (
        <>
            <NavBar/>
            <div className="Page">
                <h1 ref={pageTitle}>Loading...</h1>
                <h5 ref={pageSubtitle}></h5>

                {pageContent != "" && pluginInfo.legacyFormat ? <div className="legacyFormat" dangerouslySetInnerHTML={{ __html: pageContent }}></div>: undefined}
                {pageContent != "" && !pluginInfo.legacyFormat ? <ReactMarkdown allowElement={() => true} children={pageContent} />: undefined}
            </div>
            <Footer/>
        </>
    );
}

export default PluginDoc;
