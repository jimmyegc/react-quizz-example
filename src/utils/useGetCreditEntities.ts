//Libs
import { useQuery } from "@tanstack/react-query"
//Owncode
import { useUserStore } from "../../stores/createModuleUser"
import { getCreditEntities } from "../../services/creditEntitiesService"

export const useGetCreditEntities = () => {
    const token = useUserStore(state => state.user.token)
    return useQuery(['credit_entities'], async () => getCreditEntities(token))
}