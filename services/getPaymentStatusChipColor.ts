import theme from "../styles/theme";

export type Status =
  | "pendente de pagamento"
  | "pendente de implantação"
  | "implantação realizada"
  | "pedido cancelado";

const getPaymentStatusBadgeColor = (
  paymentStatus: Status
): { bg: string; color: string | undefined } | undefined => {
  switch (paymentStatus.toLocaleLowerCase()) {
    case "pendente de pagamento":
      return {
        bg: "rgba(229, 229, 229, 0.35)",
        color: theme.palette.neutral?.[8],
      };
    case "pendente de implantação":
      return {
        bg: "rgba(72, 97, 159, 0.35)",
        color: theme.palette.status?.link,
      };
    case "implantação realizada":
      return {
        bg: "rgba(57, 127, 72, 0.35)",
        color: theme.palette.status?.success,
      };
    case "pedido cancelado":
      return {
        bg: "rgba(191, 48, 48, 0.35)",
        color: theme.palette.status?.error,
      };
  }
};

export default getPaymentStatusBadgeColor;
