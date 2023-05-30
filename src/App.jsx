import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "./components/LoginPage/LoginPage"
import SidebarComponent from "./components/Sidebar/SidebarComponent"
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
            name: "Lançamento de Notas",
            icon: "checklist",
            url: "https://bytecodesystems.github.io/",
            root_route: "/grade-posting",
            pages: [
                { name: "Lançar Notas",   route: "/lancar-notas" },
                { name: "Notas Lançadas", route: "/notas-lancadas" },
            ]
        },
        {
            name: "Frequência",
            icon: "calendar_month",
            url: "https://bytecodesystems.github.io/findmed-website/",
            root_route: "/frequency",
            pages: []
        },
        {
            name: "Moods (Feedbacks)",
            icon: "thumbs_up_down",
            url: "http://127.0.0.1:5174",
            root_route: "/moods",
            pages: [
                { name: "Localhost Website", route: "/" }
            ]
        },
        {
            name: "Suporte ao Aluno",
            icon: "forum",
            url: "sadsadasd",
            root_route: "/support",
            pages: []
        },
        {
            name: "Comunicados",
            icon: "mail",
            url: "asddsaasd",
            root_route: "/messages",
            pages: []
        },
        {
            name: "Biblioteca Online",
            icon: "menu_book",
            url: "wewqeqwe",
            root_route: "/library",
            pages: []
        },
        {
            name: "Diagnósticos",
            icon: "analytics",
            url: "czxzxcczx",
            root_route: "/diagnostics",
            pages: []
        },
        {
            name: "Blog Educacional",
            icon: "newspaper",
            url: "locahrewhqhqlhost",
            root_route: "/blog",
            pages: [
                { name: "Nova Publicação",    route: "/new-post" },
                { name: "Minhas publicações", route: "/my-posts" },
            ]
        },
    ]

    // RETURN
    return (
        <div className="d-flex vh-100" style={{backgroundColor: "#1D2226"}}>
            <BrowserRouter>
                <SidebarComponent modules={modules} />

                <main className="flex-fill">
                    <Routes>
                        <Route exact path="/plataform/login" element={ <LoginPage /> } />

                        {/* MODULES */}
                        {modules.map(module => (
                            module.pages.map(page => (
                                <Route
                                    key={`route_${page.route}_${module.url}`}
                                    exact path={`/plataform${module.root_route}${page.route}`}
                                    element={
                                        <ModuleRenderer
                                            credentials={credentials}
                                            moduleURL={`${module.url}${page.route}`}
                                        />}
                                />
                            ))
                        ))}
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default App