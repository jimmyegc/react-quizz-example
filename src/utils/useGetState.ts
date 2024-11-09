//Libs
import { useQuery } from "@tanstack/react-query"
//Owncode
import { getSatate } from "../../services/stateService"
import { useUserStore } from "../../stores/createModuleUser"

export const useGetState = (idState: number = 0) => {
    const token = useUserStore(state => state.user.token)    
    return useQuery(['state', idState], async () => getSatate(idState, token))
}