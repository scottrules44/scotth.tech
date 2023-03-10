import React from 'react';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../pages/GlobalPageStyles.css";
import { UserCard, RepoCard } from 'react-github-cards';
import 'react-github-cards/dist/default.css';

import AppViewer from "../components/AppViewer";
function Home() {
    document.title = "Home";
    return (
          <>
            <NavBar/>
            <div className="Page">
                <h1>Home</h1>
                <p>Welcome to Scott H Tech, this is where I put my personal app, projects, and plugins(for Solar2D)</p>
                <p></p>
                <h2>Featured App:</h2>
                <h3>List Bud</h3>
                <p>This tool allows you to create and edit hitboxes easily and export it into your game.</p>
                <AppViewer appStore={"https://apps.apple.com/ph/app/list-bud/id1493135775"} googlePlay={""}/>
                <h2>Featured Project:</h2>
                <h3>Physics Body Tool</h3>
                <p>This tool allows you to create and edit hitboxes easily and export it into your game.</p>
                <p><a href="https://scottrules44.github.io/physics-body-tool/" target={"_blank"}><button>Check out this tool</button></a></p>
                <h2>Featured Plugin:</h2>
                <h3>Iron Source</h3>
                <p><a href="/plugin/ironSource"><button>Check out this plugin</button></a></p>
                <h2>More on Github:</h2>
                <UserCard username="scottrules44" />
            </div>
            <Footer/>
          </>
    );
}

export default Home;
