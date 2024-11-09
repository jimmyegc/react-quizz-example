//Libs
import { useQuery } from "@tanstack/react-query"
//Owncode

import { getMunicipality } from "../../services/municipalityService"
import { useUserStore } from "../../stores/createModuleUser"

export const useGetMunicipality = (idMunicipality: number = 0) => {
    const token = useUserStore(state => state.user.token)    
    return useQuery(['municipality', idMunicipality], async () => getMunicipality(idMunicipality, token))
}