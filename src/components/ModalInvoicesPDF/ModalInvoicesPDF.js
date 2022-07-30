import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Canvas, Document, Image, Page, PDFViewer, StyleSheet, Svg, Text, View } from "@react-pdf/renderer"
import closeIcon from "../../assets/images/close.svg"
import appIcon from "../../assets/images/logoApp.svg"
import invoiceModelImage from "../../assets/images/invoiceModel.png"
import "./ModalInvoicesPDF.css"

const styles = StyleSheet.create({
    page: {
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    image: {
        position: 'absolute',
        left: "0",
        top: "0",
        width: "595px",
        height: "840px"
    },
    canvas: {
        position: 'absolute',
        left: "0",
        top: "0",
    },
    text: {
        marginTop: "20px",
        fontSize: "40px"
    }
})

export default function ModalInvoicesPDF({state, invoiceList, closeFunction}) {

    let generatedInvoiceList = invoiceList
    // let invoicesQuantity = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000]
    let invoicesQuantity = []

    return (
        <>
            {state &&
                <Overlay>
                    <ModalContainer>
                        <PDFViewer style={{width: "700px", height: "500px"}}>
                            <Document>
                                {invoicesQuantity.length > 0 ? invoicesQuantity.map(invoice => {
                                    return(
                                        <Page size="A4" style={styles.page}>
                                            <Image
                                                src={invoiceModelImage}
                                                style={styles.image}
                                            />
                                            <Canvas
                                                paint={painter =>
                                                    painter
                                                    .text(invoice, 210, 147)
                                                    .text(invoice, 475, 147)
                                                }
                                                style={styles.canvas}
                                            />
                                        </Page>
                                    )
                                    })
                                    :
                                    <Page size="A4" style={styles.page}>
                                        <Text
                                            style={styles.text}
                                        >
                                            No hay facturas generadas
                                        </Text>
                                    </Page>
                                }
                            </Document>
                        </PDFViewer>
                        <button onClick={closeFunction} className="finish-invoicing-button">Terminar</button>
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
    padding-inline: 20px;
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
`;