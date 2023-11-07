export const currencyFormat = (number: number) => {
  const format = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);

  return format;
};
