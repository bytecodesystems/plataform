import { useEffect } from "react"

const ModuleRenderer = ({ moduleURL, credentials }) => {

    // SEND CREDENTIALS TO MODULE
    const onLoadFrame = () => {
        const moduleWindow = document.getElementById(`module_frame_${moduleURL}`).contentWindow

        moduleWindow.postMessage(JSON.stringify(credentials), "*")
        console.log("PLATAFORM: credentials sent")
    }

    // RENDERING
    return (
        <iframe
            src={moduleURL}
            id={`module_frame_${moduleURL}`}
            name={`module_frame_${moduleURL}`}
            onLoad={onLoadFrame}

            className="w-100"
            style={{height: 600}}

            // permissions
            allow="geolocation; microphone; camera; midi; encrypted-media"
            allowFullScreen
            allowpaymentrequest="true"
            allow-same-origin="true"
            allow-top-navigation="true"
            allow-forms="true"
            allow-popups="true"
            allow-scripts="true"
            allow-pointer-lock="true"
        ></iframe>
    )
}

export default ModuleRenderer

// IFRAME PERMISSIONS
    // allow:                Outras permissões adicionais que você deseja conceder ao iframe, como geolocalização, microfone, câmera, MIDI e mídia criptografada. Você pode especificar apenas as permissões necessárias para o seu caso.
    // allowFullScreen:      Permite que o iframe entre em modo de tela cheia.
    // allowPaymentRequest:  Permite que o iframe use a API PaymentRequest para processar pagamentos.
    // allow-same-origin:    Permite que o iframe acesse recursos do mesmo domínio do site pai.
    // allow-top-navigation: Permite que o iframe navegue para o domínio pai (janela superior).
    // allow-forms:          Permite que o iframe envie formulários.
    // allow-popups:         Permite que o iframe abra pop-ups.
    // allow-scripts:        Permite que o iframe execute scripts.
    // allow-pointer-lock:   Permite que o iframe utilize o recurso de bloqueio do ponteiro do mouse.