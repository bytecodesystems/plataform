import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import LoginPage from "./components/LoginPage/LoginPage"
import ModuleRenderer from "./components/ModuleRenderer/ModuleRenderer"
import { isAuthenticated } from "./utils/auth"
import { modules } from "./utils/modules"

const App = (props) => {
    // THIS MAY HAVE TO COME FROM API
    const [credentials, setCredentials] = useState({
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        username: "iuri.test",
        email: "iuri.email@test.com"
    })

    // RETURN
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/plataform/" element={ <LoginPage /> } />

                {/* MODULES */}
                {modules.map(module => (
                    module.pages.map(page => (
                        <Route
                            key={`route_${page.route}_${module.url}`}
                            exact path={`/plataform${module.root_route}${page.route}`}
                            element={
                                isAuthenticated() ? (
                                    <ModuleRenderer
                                        credentials={credentials}
                                        moduleURL={`${module.url}${page.route}`}
                                    />
                                ) : (
                                    <Navigate to="/plataform/" replace />
                                )
                            }
                        />
                    ))
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default App