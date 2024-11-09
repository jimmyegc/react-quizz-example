import { useEffect, useState } from "react"
import { ResponseToTable } from "../../models/utils/Components"

export const useFetchAndExtractData = <T,>({
    useGetData,
    fieldOfRequest,
    mapper
}: {
    useGetData: CallableFunction;
    fieldOfRequest?: string;
    mapper?: CallableFunction;
}) => {

    const { data: dataResponse } = useGetData()
    const [dataState, setDataState] = useState<ResponseToTable<T>>({
        data: undefined,
        isLoading: false
    })

    useEffect(() => {
        if (dataResponse) {
            const data = (dataResponse && fieldOfRequest) ? dataResponse[fieldOfRequest] : dataResponse
            setDataState({
                data: (mapper && data) ? mapper(data) : data,
                isLoading: false
            })
        }
    }, [dataResponse])


    return {
        dataState
    }
}