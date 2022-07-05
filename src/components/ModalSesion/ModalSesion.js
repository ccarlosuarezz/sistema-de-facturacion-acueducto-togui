import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ReactComponent as ExitIcon } from "../../assets/images/exit.svg"
import { ReactComponent as SettingsIcon } from "../../assets/images/settings.svg"
import "./ModalSesion.css"
const defaultIconsColor = "#000000"

export function ModalSesion({state, closeFunction}) {

    const navigate =  useNavigate()

    const handleClickExit = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userName');
        navigate('/')
    }

    const handleClickSetings = () => {
        navigate('/configuracion/datos-personales')
    }

    return (
        <>
            {state &&
                <Overlay onClick={closeFunction}>
                    <div className="modal-sesion">
                        <button onClick={handleClickExit}>
                            <ExitIcon width={30} height={30} fill={defaultIconsColor}/>
                            <p>Cerrar sesión</p>
                        </button>
                        <button onClick={handleClickSetings}>
                            <SettingsIcon width={30} height={30} fill={defaultIconsColor}/>
                            <p>Gestionar cuenta</p>
                        </button>
                    </div>
                </Overlay>
            }
        </>
    )
}

const Overlay = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    // background: rgba(0,0,0,0.5);
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`;