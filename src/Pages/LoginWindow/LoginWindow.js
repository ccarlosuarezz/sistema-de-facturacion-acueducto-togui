import React, { useState } from "react";
import AqueductLogo from '../../components/AqueductLogo/AqueductLogo'
import LoginForm from '../../components/LoginForm/LoginForm'
import ModalForgotPassword from '../../components/ModalForgotPassword/ModalForgotPassword'
import "./LoginWindow.css"

const LoginWindow = () => {

    const [modalStateVerifyIdentity, changeModalStateVerifyIdentity] = useState(false);
    const [modalStateCode, changeModalStateCode] = useState(false);
    const [modalStateChangePassword, changeModalStateChangePassword] = useState(false);

    return (
        <div className='Login'>
            <AqueductLogo/>
            <LoginForm forgotPassword={() => changeModalStateVerifyIdentity(true)}/>
            <ModalForgotPassword
                state={modalStateVerifyIdentity}
                closeFunction={() => changeModalStateVerifyIdentity(false)}
                title={<p>Necesitamos verificar tu identidad</p>}
                content={
                    <div>
                        <p>Enviaremos un código de seguridad al siguiente correo</p>
                        <p>correo.personal@mail.com</p>
                    </div>
                }
                acceptFunction={() => {
                    changeModalStateVerifyIdentity(false);
                    changeModalStateCode(true);
                }}
            />
            <ModalForgotPassword
                state={modalStateCode}
                closeFunction={() => changeModalStateCode(false)}
                title={<p>Ingresa el código de seguridad<br/>que te hemos enviado</p>}
                content={<input type="number"/>}
                acceptFunction={() => {
                    changeModalStateCode(false);
                    changeModalStateChangePassword(true);
                }}
            />
            <ModalForgotPassword
                state={modalStateChangePassword}
                closeFunction={() => changeModalStateChangePassword(false)}
                title={<p>Cambiar contraseña</p>}
                content={
                    <div>
                        <div>
                            <p>Nueva contraseña</p>
                            <input type="password"/>
                        </div>
                        <div>
                            <p>Confirmar contraseña</p>
                            <input type="password"/>
                        </div>
                    </div>
                }
                acceptFunction={() => {
                    changeModalStateChangePassword(false);
                }}
            />
        </div>
    )
}

export default LoginWindow