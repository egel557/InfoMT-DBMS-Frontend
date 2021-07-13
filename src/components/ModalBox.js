import { 
    Modal,
    Box,
} from "@material-ui/core"

export default function ModalBox({ children, width=550, height=600, ...modalProps }){
    return <Modal 
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }} 
        {...modalProps}
    >
        <Box style={{ outline: 0 }} width={width} height={height} alignItems="center">
            {children({
                cardProps: {
                    style: { maxHeight: height, display: "flex", flexDirection: "column" }
                },
                cardContentProps: {
                    style: { flexGrow: 1, overflow: "scroll" }
                }
            })}
        </Box>
    </Modal>
}