import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar/Sidebar"
import ModuleRenderer from "./components/ModuleRenderer/ModuleRenderer"

const App = () => {

    // THIS HAVE TO COME FROM API
    const [credentials, setCredentials] = useState({
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        username: "iuri.test",
        email: "iuri.email@test.com"
    })

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
        {
            name: "Site Local",
            route: "localhost",
            icon: "",
            url: "http://127.0.0.1:5174/"
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
                            <ModuleRenderer
                                credentials={credentials}
                                moduleURL={module.url} 
                            />
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default App