import React from 'react';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import data from "../pluginDocs/pluginList.json";
import "../pages/Plugins.css";
function Plugins() {
    document.title = "Plugins";
    const categories=data.categories;
    const plugins=data.plugins;
    var sortedPlugins ={};
    Object.keys(plugins).forEach((e)=>{
        var d = plugins[e];
        if(sortedPlugins[d.category] === undefined){
            sortedPlugins[d.category] = [];
        }
        sortedPlugins[d.category].push({...d, key:e})
    })

    function getPluginsForCategories(category){
        if(sortedPlugins[category]){
            return sortedPlugins[category].map((plugin, i) => {
                const pluginPath = plugin.key.replace("-", "/");
                if(plugin.hidden === true){
                    return null
                }
                return (
                 <a href={"/"+pluginPath}><h3>{plugin.name}</h3></a>
                );
            });
        }else{
            return <></>
        }

    }

    function renderCategories(){

        return categories.map((category, i) => {
            return (
            <>
                <h2>{category}</h2>
                <div className="pluginCategory">
                    {getPluginsForCategories(category)}
                </div>
            </>
            );
        });
    }

    return (
        <>
            <NavBar/>
            <div className="Page">
                <h1>Plugins</h1>
                {renderCategories()}
            </div>
            <Footer/>
        </>
    );
}

export default Plugins;
