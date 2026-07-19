import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [cartItems, setCartItems] = useState({});

  let url = "http://localhost:3000";

  const [token, setToken] = useState("");
  let [food_list, setFoodList] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      let res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setFoodList(res.data.data);
      }
    };
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${url}/api/user/me`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    const fetchCart = async () => {
      const res = await axios.get(`${url}/api/cart/get`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    };

    const loadData = async () => {
      await fetchFood();
      await checkLogin();
      await fetchCart();
    };

    loadData();
  }, []);

  // ➕ ADD TO CART
  const addToCart = async (id) => {
    console.log("cartItems:", cartItems);
    console.log("id:", id);
    console.log("cartItems[id]:", cartItems[id]);
    if (!cartItems[id]) {
      setCartItems((prev) => ({ ...prev, [id]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }

    try {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId: id },
        {
          withCredentials: true, // cookie send karega
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ➖ REMOVE FROM CART
  const removeFromCart = async (id) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[id] > 1) {
        updatedCart[id] -= 1;
      } else {
        delete updatedCart[id];
      }

      return updatedCart;
    });

    try {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId: id },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 💰 TOTAL CALCULATION
  const getTotalCartAmount = () => {
    let cartTotal = 0;
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        cartTotal += item.price * cartItems[item._id];
      }
    });
    let deliveryFee = cartTotal === 0 ? 0 : 5;
    return cartTotal + deliveryFee;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    // AUTH
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
