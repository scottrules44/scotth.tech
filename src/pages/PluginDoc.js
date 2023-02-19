import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import data from "../pluginDocs/pluginList.json";
import ReactMarkdown from 'react-markdown'
import "../pages/PluginDoc.css"
import Footer from "../components/Footer";
function PluginDoc() {
    document.title = "Loading...";
    const pageTitle = useRef();
    const pageSubtitle = useRef();
    const [pageContent, setPageContent] = useState("<div></div>");
    var pathName = window.location.pathname.substring(1);
    const pluginKey = pathName.replace("/", "-");
    var pluginInfo;
    if(data.plugins[pluginKey]){
        pluginInfo = data.plugins[pluginKey];
        document.title =pluginInfo.name+" Plugin";
    }else{
        document.title = "Plugin Not Found";
    }

    async function getLegacyDocs() {
        var docsPath =require('../pluginDocs/'+pluginKey+".htm");
        var docsText = await (await fetch(docsPath)).text();
        setPageContent(docsText);
    }

    useEffect(()=>{
        if(pluginInfo){
            pageTitle.current.innerText = pluginInfo.name;
            pageSubtitle.current.innerText = "Solar2D Plugin Docs";
            if(pluginInfo.legacyFormat){
                getLegacyDocs()
            }
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
                
                {pageContent != ""? <div className="legacyFormat" dangerouslySetInnerHTML={{ __html: pageContent }}></div>: undefined}
            </div>
            <Footer/>
        </>
    );
}

export default PluginDoc;