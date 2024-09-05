import {createContext, useContext, useState} from 'react';
import {IPayment} from '../interface/payment';

type PaymentContextType = {
  payment: IPayment[];
  addPayment: (item: IPayment) => void;
  removePayment: (item: IPayment) => void;
};
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [payment, setPayment] = useState<IPayment[]>([]);

  const addPayment = (item: IPayment) => {
    setPayment([{...item}, ...payment]);
  };
  const removePayment = (item: IPayment) => {
    setPayment(payment.filter(payment => payment.code !== item.code));
  };
  return (
    <PaymentContext.Provider value={{payment, addPayment, removePayment}}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
