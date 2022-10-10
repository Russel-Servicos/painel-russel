import {
  Select,
  MenuItem,
  Typography,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { KeyboardArrowDownIcon } from "../icons";
import theme from "../styles/theme";

interface Props {
  options: [{ name: string; value: string | number }];
  label: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  value: string;
}

const FilterSelect = ({ options, label, onChange, value }: Props) => {
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
        onChange={onChange}
        value={value}
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
