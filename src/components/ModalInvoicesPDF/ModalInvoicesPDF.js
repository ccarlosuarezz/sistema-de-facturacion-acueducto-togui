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

let generatedInvoiceList = []

export default function ModalInvoicesPDF({state, invoiceList, closeFunction}) {
    generatedInvoiceList = invoiceList

    console.log(invoiceList)

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
                        <PDFViewer style={{width: "700px", height: "500px"}}>
                            <Document>
                                {generatedInvoiceList.length > 0 ? generatedInvoiceList.map(invoice => {
                                    return(
                                        <Page size="A4" style={styles.page}>
                                            <Image
                                                src={invoiceModelImage}
                                                style={styles.image}
                                            />
                                            {invoice[0].anotaciones.length > 0 ? invoice[0].anotaciones.map((annotation, index) => {
                                                return(
                                                    <Canvas
                                                        paint={painter =>
                                                            painter.text(annotation.concepto, 20, (487+index*15))
                                                        }
                                                        style={styles.canvas}
                                                    />
                                                )
                                                })
                                                :
                                                <Canvas
                                                    paint={painter =>
                                                        painter.text('Ninguna', 20, 487)
                                                    }
                                                    style={styles.canvas}
                                                />
                                            }
                                            <Canvas
                                                paint={painter =>
                                                    painter
                                                    .text(invoice[0].referencia_de_pago, 210, 147)
                                                    .text(invoice[0].numero_matricula, 475, 147)
                                                    .text(invoice[0].fecha_de_emision, 50, 200)
                                                    .text(invoice[0].periodo_facturado, 190, 200)
                                                    .text(invoice[0].fecha_maxima_de_pago, 460, 200)
                                                    .text(invoice[0].nombre_suscriptor, 82, 262)
                                                    .text(invoice[0].direccion, 90, 276)
                                                    .text(invoice[0].uso, 57, 289)
                                                    .text(invoice[0].marca_medidor, 85, 359)
                                                    .text(invoice[0].fecha_de_lectura_anterior !== null? invoice[0].fecha_de_lectura_anterior: '--/--/----', 185, 371)
                                                    .text(invoice[0].fecha_de_lectura_actual !== null? invoice[0].fecha_de_lectura_actual: '--/--/----', 175, 385)
                                                    .text(invoice[0].lectura_anterior, 130, 399)
                                                    .text(invoice[0].lectura_actual, 120, 411)
                                                    .text(invoice[0].total_metros_facturados, 152, 424)
                                                    // .text(invoice[0].anotaciones !== null? invoice[0].anotaciones: 'Ninguna', 20, 487)
                                                    .text(formatter.format(invoice[0].consumo), 500, 276)
                                                    .text(formatter.format(invoice[0].cargo_fijo), 500, 292)
                                                    .text(formatter.format(invoice[0].costo_de_matricula), 500, 309)
                                                    .text(formatter.format(invoice[0].sanciones), 500, 325)
                                                    .text(formatter.format(invoice[0].multas), 500, 341)
                                                    .text(formatter.format(invoice[0].otros_cobros), 500, 357)
                                                    .text(formatter.format(invoice[0].deuda_anterior), 500, 374)
                                                    .text(formatter.format(invoice[0].total), 500, 533)
                                                    //Colilla
                                                    .text(invoice[0].periodo_facturado, 150, 705)
                                                    .text(invoice[0].numero_factura, 150, 722)
                                                    .text(invoice[0].numero_matricula, 150, 739)
                                                    .text(invoice[0].nombre_suscriptor, 150, 755)
                                                    .text(invoice[0].direccion, 150, 771)
                                                    .text(formatter.format(invoice[0].consumo), 510, 705)
                                                    .text(formatter.format(invoice[0].cargo_fijo), 510, 722)
                                                    .text(formatter.format(invoice[0].costo_de_matricula), 510, 739)
                                                    .text(formatter.format(invoice[0].sanciones), 510, 755)
                                                    .text(formatter.format(invoice[0].multas), 510, 771)
                                                    .text(formatter.format(invoice[0].otros_cobros), 510, 787)
                                                    .text(formatter.format(invoice[0].deuda_anterior), 510, 803)
                                                    .text(formatter.format(invoice[0].total), 510, 820)
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