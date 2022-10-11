import {
  AttachMoneyIcon,
  CreditCardIcon,
  InsertDriveFileIcon,
  PixRoundedIcon,
} from "../icons";

const getPaymentMethodIcon = (paymentMethod: 1 | 2 | 5 | 6) => {
  switch (paymentMethod) {
    case 1:
      return <AttachMoneyIcon />;
    case 2:
      return <CreditCardIcon />;
    case 5:
      return <PixRoundedIcon />;
    case 6:
      return <InsertDriveFileIcon />;
  }
};

export default getPaymentMethodIcon;
