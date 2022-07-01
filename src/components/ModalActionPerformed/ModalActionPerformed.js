import styled from "styled-components"
import "./ModalActionPerformed.css"

export function ModalActionPerformed({img, title, state, accept}) {

    return (
        <>
            {state &&
                <Overlay>
                    <ModalContainer>
                        <img src={img} height={100}/>
                        <p className="p-modal">{title}</p>
                        <button onClick={accept} className="accept-modal-button">Aceptar</button>
                    </ModalContainer>
                </Overlay>
            }
        </>
    )
}

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center
`;

const ModalContainer = styled.div`
    background: #ffffff;
    position: relative;
    border-radius: 10px;
    padding-inline: 40px;
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
`;