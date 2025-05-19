import { useContext } from "react";
import AuthState from "../../auth/state/AuthState";

const useProtectedRoutePolicy = () => {

    const {user, setUser} = useContext(AuthState)

    return {
        user,
        setUser
    }
}

export default useProtectedRoutePolicy