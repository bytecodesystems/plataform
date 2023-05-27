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
            pages: [
                { name: "Lançar Notas",   route: "/grade-posting/lancar-notas" },
                { name: "Notas Lançadas", route: "/grade-posting/notas-lancadas" },
            ]
        },
        {
            name: "Frequência",
            icon: "calendar_month",
            url: "https://bytecodesystems.github.io/findmed-website/",
            pages: []
        },
        {
            name: "Moods (Feedbacks)",
            icon: "thumbs_up_down",
            url: "localhost",
            pages: []
        },
        {
            name: "Suporte ao Aluno",
            icon: "forum",
            url: "localhost",
            pages: []
        },
        {
            name: "Comunicados",
            icon: "mail",
            url: "localhost",
            pages: []
        },
        {
            name: "Biblioteca Online",
            icon: "menu_book",
            url: "localhost",
            pages: []
        },
        {
            name: "Diagnósticos",
            icon: "analytics",
            url: "localhost",
            pages: []
        },
        {
            name: "Blog Educacional",
            icon: "newspaper",
            url: "localhost",
            pages: [
                { name: "Nova Publicação",    route: "/blog/new-post" },
                { name: "Minhas publicações", route: "/blog/my-posts" },
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
                        {/* IDEA: CONCAT MODULE.URL + PAGE.ROUTE */}
                        {modules.forEach(module => {
                            module.pages.map(page => (
                                <Route
                                    key={`route_${page.route}_${module.url}`}
                                    exact path={`/plataform${page.route}`}
                                    element={
                                        <ModuleRenderer
                                            credentials={credentials}
                                            moduleURL={module.url}
                                        />}
                                />
                            ))
                        })}
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default App