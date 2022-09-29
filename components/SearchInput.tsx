import { Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../styles/theme";
import { ChangeEvent } from "react";

interface Props {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const SearchInput = ({ onChange, value }: Props) => {
  return (
    <Input
      placeholder="Pesquisar"
      disableUnderline
      sx={{
        minWidth: theme.spacing(100),
        border: `1px solid ${theme.palette.neutral?.[7]}`,
        padding: "6px 16px",
        height: "36px",
        borderRadius: theme.spacing(2),
      }}
      onChange={onChange}
      value={value}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon sx={{ cursor: "pointer" }} />
        </InputAdornment>
      }
    />
  );
};

export default SearchInput;
