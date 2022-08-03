import styled from "styled-components"
import closeIcon from "../../assets/images/close.svg"
import "./ModalShowPenalty.css"


export function ModalShowPenalty({state, penalty, closeFunction}) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    return (
        <>
            {state &&
                <Overlay>
                    <ModalContainer>
                    <input
                        type="image"
                        src={closeIcon}
                        width={30}
                        onClick={() => closeFunction()}
                        className="button-back"
                    />
                    <div className="penalty-detail-info">
                        <p><b>Matrícula: </b>{penalty.id_enrollment}</p>
                        <p><b>Suscriptor: </b>{penalty.subscriber}</p>
                        <p><b>Cobro: </b>{penalty.type_charge}</p>
                        <p><b>Cantidad: </b>{penalty.quantity}</p>
                        <div>
                            <p><b>Observaciones</b></p>
                            <div className="observations-penalty-details">
                                <p>{penalty.observations?penalty.observations:'Ninguna'}</p>
                            </div>
                        </div>
                        <p><b>Valor: </b>{formatter.format(penalty.total_value)}</p>
                    </div>
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