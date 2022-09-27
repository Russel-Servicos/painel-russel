import { styled } from "@mui/material/styles";
import { Card, CardMedia, Typography } from "@mui/material";
import { borderRadius, Box } from "@mui/system";
import { ReactNode } from "react";
import theme from "../styles/theme";
import Link from "next/link";

const RusselMainCardIconBox = styled("i")(({ theme }) => ({
  borderRadius: "50%",
  backgroundColor: theme.palette.neutral?.[4],
  minWidth: 64,
  height: 64,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& svg": {
    minWidth: 32,
    minHeight: 32,
  },
}));

export const MainCardIconBox = ({
  icon,
  color,
}: {
  icon: ReactNode;
  color: string | undefined;
}) => <RusselMainCardIconBox sx={{ color }}>{icon}</RusselMainCardIconBox>;

const MainCard = ({
  icon,
  title,
  description,
  href,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <Link href={href}>
      <Card
        sx={{
          width: "100%",
          display: "flex",
          padding: theme.spacing(6),
          gap: theme.spacing(6),
          cursor: "pointer",
          "&:hover": { backgroundColor: theme.palette.neutral?.[4] },
          boxShadow: "none",
          borderRadius: theme.spacing(2),
        }}
      >
        {icon}

        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="title3" sx={{ fontWeight: "medium" }}>
            {title}
          </Typography>
          <Typography variant="paragraph2">{description}</Typography>
        </Box>
      </Card>
    </Link>
  );
};

export default MainCard;
