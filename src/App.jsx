import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar/Sidebar"
import ModuleRenderer from "./components/ModuleRenderer/ModuleRenderer"

const App = () => {

    // modules deployeds
    const modules = [
        {
            name: "Site Bytecode",
            route: "grade-posting",
            icon: "",
            url: "https://bytecodesystems.github.io/"
        },
        {
            name: "Site Findmed",
            route: "find-med",
            icon: "",
            url: "https://bytecodesystems.github.io/findmed-website/"
        },
    ]

    return (
        <BrowserRouter>
            <Sidebar modules={modules} />

            {/* MODULES */}
            <Routes>
                {modules.map(module => (
                    <Route
                        key={`route_${module.path}_${module.url}`}
                        exact path={`/plataform/${module.route}`}
                        element={
                            <ModuleRenderer moduleURL={module.url} />
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default App