import { Box } from "@mui/material";
import CategoryChart from "../../areas/SectionProductCharts/CategoryChart";
import StockChart from "../../areas/SectionProductCharts/StockChart";


export const SectionProductCharts = (props: { categories: any[]; products: any[]; variants: any[]; }) => {
    return (<Box display={'flex'} gap={3} sx={{
        flexDirection: {
            xs: 'column',
            sm: 'row'
        }
    }}>
        <CategoryChart categories={props.categories} products={props.products} />
        <StockChart variants={props.variants} />
    </Box>);
}