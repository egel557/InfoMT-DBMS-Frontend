import { Box, Divider } from "@material-ui/core"

export default function PageTemplate({ panel=[], content }){
    return <Box>
        {panel.length > 0 && <>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
            {panel.map((col, index) => 
            <Box key={index} display="flex"> 
                {col.map((item, i) =>
                <Box key={i} mr={1}>
                    {item}
                </Box>
                )}
            </Box>
            )}
        </Box>
        <Box mb={2}>
            <Divider/>
        </Box>
        </>}
        <Box>
            {content}
        </Box>
    </Box>
}