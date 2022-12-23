import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function increaseQty() {
    setProductQuantity((prevState) => prevState + 1);
  }

  function decreaseQty() {
    setProductQuantity((prevState) => prevState - 1);
  }

  function handleOnAdd(product, quantity) {
    setTotalQuantity((prevValue) => prevValue + quantity);
    setTotalPrice((prevValue) => prevValue + product.price * quantity);

    const isProdcutExist = cartItems.find((item) => item.slug === product.slug);
    if (isProdcutExist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? {
                ...isProdcutExist,
                quantity: isProdcutExist.quantity + quantity,
              }
            : item
        )
      );
    }
    else {

        setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  }

//   remove products from cart
  const handleOnRemove = (product) => {
        setTotalQuantity((prevValue) => prevValue - 1)
        setTotalPrice((prevValue) => prevValue - product.price)
        const isProdcutExist = cartItems.find(
          (item) => item.slug === product.slug
        );
        if (isProdcutExist.quantity === 1 ){
            setCartItems(cartItems.filter((item) => item.slug !== product.slug))
        } else {
          setCartItems(
            cartItems.map((item) =>
              item.slug === product.slug
                ? {
                    ...isProdcutExist,
                    quantity: isProdcutExist.quantity - 1,
                  }
                : item
            )
          );
            
        }

  }

  return (
    <StoreContext.Provider
      value={{
        productQuantity,
        cartItems,
        setCartItems,
        increaseQty,
        decreaseQty,
        handleOnAdd,
        setShowCart,
        showCart,
        handleOnRemove,
        totalQuantity,
        setTotalQuantity,
        totalPrice,
        setTotalPrice
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
