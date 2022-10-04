import { Button as MButton, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface RusselButtonProps {
  small?: boolean;
}

const RusselButton = ({
  small,
  children,
  className,
  ...props
}: RusselButtonProps & ButtonProps) => (
  <MButton
    sx={{ height: `${small ? "30px" : "40px"}` }}
    className={className}
    disableRipple
    disableElevation
    {...props}
  >
    {children}
  </MButton>
);

export const Button = styled(RusselButton)(({ theme }) => ({
  background: theme.palette.russel?.main,
  color: theme.palette.neutral?.main,
  "&:hover": {
    backgroundColor: theme.palette.russel?.medium,
  },
  "&:active": {
    backgroundColor: theme.palette.russel?.dark,
  },
}));

export const LightButton = styled(RusselButton)(({ theme }) => ({
  background: theme.palette.neutral?.[2],
  color: theme.palette.neutral?.[8],
  border: `2px solid ${theme.palette.neutral?.[4]}`,
  "&:hover": {
    backgroundColor: theme.palette.neutral?.[4],
  },
  "&:active": {
    backgroundColor: theme.palette.neutral?.[5],
    border: `2px solid ${theme.palette.neutral?.[5]}`,
  },
}));

export default Button;
