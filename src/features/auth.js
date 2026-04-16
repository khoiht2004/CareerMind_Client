import { useGetMeQuery } from "@/services/auth.service";

function AuthInitializer() {
      useGetMeQuery();
      return null;
}

export default AuthInitializer;
