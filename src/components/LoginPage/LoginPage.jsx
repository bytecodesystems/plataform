import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./LoginPage.css"
import { isAuthenticated } from "../../utils/auth"

const LoginPage = () => {
    const navigate = useNavigate()

    const [signUpButton, setSignUpButton] = useState(null)
    const [signInButton, setSignInButton] = useState(null)
    const [container, setContainer] = useState(null)

    // handle login submit
    async function handleSubmit(event) {
        event.preventDefault()
        const api = import.meta.env.VITE_API_URL
        
        // storing elements
        const username = document.querySelector("#user").value
        const password = document.querySelector("#password").value
        const span = document.querySelector(".output")

        // requiring to API
        await fetch(`${api}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.validated) {
                    // save token in localstorage
                    localStorage.setItem("bytecode_token", data.validated)

                    // NAVIGATE USER TO SOME SCREEN
                    const isAuth = isAuthenticated()
                    isAuth ? navigate("/plataform/grade-posting") : null
                }
                else {
                    span.innerHTML = "Usuário ou senha inválida"
                }
            })
            .catch(error => {
                console.error(error)
                span.innerHTML = "Erro interno"
            })
    }

    // basic script
    const handleSingUpClick = () => {
        container.classList.add("right-panel-active")
    }

    const handleSingInClick = () => {
        container.classList.remove("right-panel-active")
    }

    useEffect(() => {
        if (!container) {
            setSignUpButton(document.getElementById('signUp'))
            setSignInButton(document.getElementById('signIn'))
            setContainer(document.getElementById('container'))
        }
        else {
            signUpButton.addEventListener('click', handleSingUpClick)
            signInButton.addEventListener('click', handleSingInClick)

            return () => {
                signUpButton.removeEventListener('click', handleSingUpClick)
                signInButton.removeEventListener('click', handleSingInClick)
            }
        }
    }, [container])

    // render
    return (
        <main id="loginpage">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Criar conta</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>

                        <span>ou usar email para se registrar</span>
                        <input type="text" placeholder="Nome completo" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Senha" />

                        <button className="m-3">Inscrever-se</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>

                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>

                    <span className="output">ou use sua conta</span>
                    <input id="user" type="text" placeholder="Usuário" required />
                    <input id="password" type="password" placeholder="Senha" required />
                    <a href="#">Esqueci a senha</a>

                    <button>Entrar</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Bem vindo de volta!</h1>
                            <p>Para se manter conectado conosco, faça o login com suas informações pessoais</p>
                            <button className="ghost" id="signIn">Entrar</button>
                        </div>

                        <div className="overlay-panel overlay-right">
                            <h1>Olá!</h1>
                            <p>Introduza os seus dados pessoais e comece a usar nossa plataforma</p>
                            <button className="ghost" id="signUp">Inscrever-se</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LoginPage