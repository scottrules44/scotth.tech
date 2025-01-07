import React, { useEffect } from 'react';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../pages/GlobalPageStyles.css";
import { UserCard, RepoCard } from 'react-github-cards';
import 'react-github-cards/dist/default.css';

import AppViewer from "../components/AppViewer";
function Home() {
    document.title = "Home";
    useEffect(() => {
      // Create a script element to load the GitHub Cards widget
      const script = document.createElement('script');
      script.src = '//cdn.jsdelivr.net/github-cards/latest/widget.js';
      script.async = true;
      document.body.appendChild(script);
  
      // Clean up the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }, []);
    return (
          <>
            <NavBar/>
            <div className="Page tailwind-layout">
                <h2 class="text-4xl my-5 font-bold">Home</h2>
                <p>Welcome to Scott H Tech, this is where I put my personal app, projects, and plugins(for Solar2D)</p>
                <p></p>
                <h2 class="text-2xl">Featured App:</h2>
                <h3 class="text-xl">List Bud</h3>
                <p>This tool allows you to create and edit hitboxes easily and export it into your game.</p>
                <AppViewer appStore={"https://apps.apple.com/ph/app/list-bud/id1493135775"} googlePlay={""}/>

                <p class="text-2xl my-5">Featured Project:</p>
                <p class="text-lg">Physics Body Tool</p>
                <p>This tool allows you to create and edit hitboxes easily and export it into your game.</p>
                <a href="https://scottrules44.github.io/physics-body-tool/" target={"_blank"}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded my-3">Check out this tool</button></a>

                <h2>Featured Plugin:</h2>
                <h3>Iron Source</h3>
                <a href="/plugin/ironSource"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded my-3">Check out this plugin</button></a>

                <h2>More on Github:</h2>
                <div
                  className="github-card"
                  data-github="scottrules44"
                  data-width="400"
                  data-height=""
                  data-theme="default"
                ></div>
            </div>
            <Footer/>
          </>
    );
}

export default Home;
