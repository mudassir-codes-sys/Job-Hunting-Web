import { useGlobalContext } from "@/app/context/app-context";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
function GoogleLoginComponent() {
  const { setLoading } = useGlobalContext();
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    setLoading(true);
    const id = toast.loading("Loading...");
    try {
      const token = credentialResponse.credential;
      const res = await fetch("/api/auth/google/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "An unexpected error occur", { id });
      } else {
        toast.success(data.message, { id });
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      toast.error("Something went wrong", { id });
      console.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Something went wrong in error ")}
    ></GoogleLogin>
  );
}

export default GoogleLoginComponent;
