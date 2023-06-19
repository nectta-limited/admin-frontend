export const thousand = (amount: string | number) => {
  // convert number to string
  let amnt = String(amount).split(".");
  // add commas to numbers before the decimal
  amnt[0] = amnt[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // return comma separated string
  return amnt.join(".");
};

export const amountFormatter = (amount: string) => {
  amount = amount.replace(/^0+/, "");
  if (amount.replace(/\s/g, "").length > 2) {
    return amount.substr(0, amount.length - 2) + "." + amount.substr(-2);
  }
  return amount.replace(/\s/g, "").length ? "0." + amount : amount;
};

export const thousandd = (amount: string | number) => {
  let amnt = String(amount).split(".");

  // amnt[0] = amnt[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const testArr = [...amnt[0].split("")];
  let reversed = testArr.reverse();
  // for(let i=1; i<=amnt[0].length; i++) {
  //   if(i % 3 === 0) {
  //     console.log(i)
  //   }
  // }
  let formatted = "";
  reversed.map((i, n) => {
    // if(n < 3) {
    //   return formatted += `${n}`
    // }
    if (n % 3 === 0 && n >= 3) {
      return (formatted += `,${i}`);
    } else {
      return (formatted += `${i}`);
    }
  });
  console.log({ formatted });

  // amnt[0] = amnt[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  amnt[0] = formatted.split("").reverse().join("");

  return amnt.join(".");
};
