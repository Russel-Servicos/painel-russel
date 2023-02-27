import {
  Select,
  MenuItem,
  Typography,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useRef } from "react";
import { KeyboardArrowDownIcon } from "../icons";
import theme from "../styles/theme";

interface Props {
  options: [{ name: string; value: string | number }];
  label: string;
  onFiltersChange: (filters: {
    date?: string;
    status?: string;
    payment?: string;
  }) => void;
  value?: string;
}

const FilterSelect = ({ options, label, onFiltersChange }: Props) => {
  const filters_ref = useRef({})

  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    const {name, value} = e.target
    filters_ref.current = { ...filters_ref.current, [name]: value };
    onFiltersChange(filters_ref.current);
  }
  return (
    <FormControl
      sx={{
        "&::before": {
          content: "''",
        },
        "& div::before": {
          display: "none",
        },
        "& .MuiInputBase-root-MuiInput-root-MuiSelect-root::before": {
          content: "none",
        },
        "& .MuiInputBase-root::after": {
          border: "none",
        },
        "& div:focus": {
          backgroundColor: "#fff",
        },
      }}
    >
      <Select
        variant="standard"
        size="small"
        defaultValue={""}
        displayEmpty
        renderValue={(value) => (value === "" ? label : value)}
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          fontSize: theme.typography?.paragraph,
          color: theme.palette.neutral?.[7],
          "& .MuiSelect-select": {
            padding: 0,
            marginRight: theme.spacing(2),
          },
        }}
        onChange={handleFilterChange}
        //value={value}
      >
        <MenuItem value={""}>
          <Typography variant="paragraph">Nenhum</Typography>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            <Typography variant="paragraph">{option.name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
