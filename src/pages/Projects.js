import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Projects() {
    document.title = "Projects";
    return (
        <>
        <NavBar/>
        <div className="Page">
            <h1>Projects</h1>
            <h3>Physics Body Tool</h3>
            <p>This tool allows you to create and edit hitboxes easily and export it into your game.</p>
            <p><a href="https://scottrules44.github.io/physics-body-tool/" target={"_blank"}><button>Check out tool</button></a></p>
        </div>
        <Footer/>
        </>
    );
}

export default Projects;