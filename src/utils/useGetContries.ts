//Libs
import { useQuery } from "@tanstack/react-query"
//Owncode
import { getContries } from "../../services/contryService"

export const useGetContries = () => {
    // const token = useUserStore(state => state.user.token)
    return useQuery(['contries'], async () => getContries())
}