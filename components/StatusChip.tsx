import { Chip, Typography } from "@mui/material";
import getPaymentStatus from "../services/getPaymentStatus";
import getPaymentStatusChipColor from "../services/getPaymentStatusChipColor";

export type DBStatusName = "pending" | "paid" | "signed" | "canceled";
const StatusChip = ({ status }: { status: DBStatusName }) => {
  const translatedStatus = getPaymentStatus(status) || undefined;
  return (
    <Chip
      label={
        <Typography variant="label">
          {getPaymentStatus(status)?.toUpperCase()}
        </Typography>
      }
      sx={{
        padding: "8px 4px",
        backgroundColor: `${getPaymentStatusChipColor(translatedStatus)?.bg}`,
        color: `${getPaymentStatusChipColor(translatedStatus)?.color}`,
        "& span": { fontWeight: 800 },
      }}
    />
  );
};

export default StatusChip;
