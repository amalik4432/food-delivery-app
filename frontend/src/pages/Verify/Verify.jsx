import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { storeContext } from "../../context/StoreContext.jsx";
import axios from "axios";

const Verify = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(storeContext);

  console.log(success, orderId);

  const verifyPayment = async () => {
    try {
      const res = await axios.get(
        `${url}/api/order/verify?success=${success}&orderId=${orderId}`,
      );

      if (res.data.success) {
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
