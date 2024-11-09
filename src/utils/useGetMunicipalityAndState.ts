//Libs
import { useQuery } from "@tanstack/react-query"
//Owncode
import { getMunicipalityAndState } from "../../services/cpService"
import { useUserStore } from "../../stores/createModuleUser"

export const useGetMunicipalityAndState = (cp: string = '') => {
    const token = useUserStore(state => state.user.token)    
    return useQuery(['cps', cp], async () => getMunicipalityAndState(cp, token))
}