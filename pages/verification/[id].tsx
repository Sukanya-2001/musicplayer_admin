import { OtpVerify } from "@/components/Auth/OtpVerify";
import { ResetPassword } from "@/components/Auth/ResetPassword";
import { useRouter } from "next/router";
import { useState } from "react";

const Verification = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [restPss, setResetPass] = useState<boolean>(false);
  const handleResetPassword = () => {
    setResetPass(true);
  };
  
  return restPss ? <ResetPassword email={id ?? ''} /> : <OtpVerify email={id ?? ''} handleResetPassword={handleResetPassword}/>;
};

export default Verification;
