import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ILOVItem from '../../models/Common/ILOVItem';
interface LOVProps {
    fieldName: string;
    label: string;
    data: ILOVItem[];
    value: string;
    onChange: (name: string, value: string) => void;
    disabled?: boolean;
    isDefaultAllow?: boolean;

}
const LOVs: React.FC<LOVProps> = ({ fieldName, label, data, value, onChange, disabled, isDefaultAllow = true }) => {

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        onChange(fieldName, selectedValue);
    };

    // console.log("lov");

    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={handleSelectChange}
                label={label}
                disabled={disabled}
            >
                {isDefaultAllow && <MenuItem key='select-item' value='0'>Select Item</MenuItem>}
                {data.map((d) => (
                    <MenuItem key={d.value} value={d.value}>
                        {d.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default LOVs;



