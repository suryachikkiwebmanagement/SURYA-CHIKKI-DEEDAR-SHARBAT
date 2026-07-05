import React, { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  const [inquiryItems, setInquiryItems] = useState([]);

  const addToInquiry = (product) => {
    const existingItem = inquiryItems.find((item) => item.id === product.id);
    
    if (existingItem) {
      const updatedItems = inquiryItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setInquiryItems(updatedItems);
      toast.success('Updated ' + product.name + ' quantity!');
    } else {
      setInquiryItems([...inquiryItems, { ...product, quantity: 1 }]);
      toast.success(product.name + ' added to inquiry basket!');
    }
  };

  const removeFromInquiry = (id) => {
    const filteredItems = inquiryItems.filter((item) => item.id !== id);
    setInquiryItems(filteredItems);
    toast.success('Item removed from inquiry basket');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromInquiry(id);
      return;
    }
    
    const updatedItems = inquiryItems.map((item) =>
      item.id === id ? { ...item, quantity: quantity } : item
    );
    setInquiryItems(updatedItems);
  };

  const clearInquiry = () => {
    setInquiryItems([]);
    toast.success('Inquiry basket cleared');
  };

  const getTotalItems = () => {
    let total = 0;
    inquiryItems.forEach((item) => {
      total = total + item.quantity;
    });
    return total;
  };

  return (
    <InquiryContext.Provider
      value={{
        inquiryItems: inquiryItems,
        addToInquiry: addToInquiry,
        removeFromInquiry: removeFromInquiry,
        updateQuantity: updateQuantity,
        clearInquiry: clearInquiry,
        getTotalItems: getTotalItems,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within InquiryProvider');
  }
  return context;
};
