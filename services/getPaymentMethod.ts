const getPaymentMethod = (payment_number: number): string => {
  switch (payment_number) {
    case 1:
      return "Boleto bancário";
    case 2:
      return "Cartão de crédito";
    case 5:
      return "PIX";
    case 6:
      return "Faturado";
    default:
      return "";
  }
};

export default getPaymentMethod;
