import { DBStatusName } from "../components/StatusChip";
import { Status } from "./getPaymentStatusChipColor";

const getPaymentStatus = (status: DBStatusName): Status => {
  switch (status) {
    case "pending":
      return "pendente de pagamento";
    case "paid":
      return "pagamento efetuado";
    case "signed":
      return "pendente de implantação";
    case "canceled":
      return "pedido cancelado";
  }
};

export default getPaymentStatus;
