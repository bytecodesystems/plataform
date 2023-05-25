import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar/Sidebar"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/plataform/" element={ <Sidebar /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App