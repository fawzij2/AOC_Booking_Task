import './App.css';
import Login from "./components/login";
import Navigation from "./components/navigation";
import Register from "./components/register";
import CreateService from "./components/createService";

function App() {
    return (
        <div className="App">
            <Navigation/>
            <CreateService />
        </div>
    );
}

export default App;
