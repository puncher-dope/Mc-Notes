import type { Dispatch, SetStateAction } from "react"

export type MyContextType = {
    router: string | boolean,
    setRouter:Dispatch<SetStateAction<boolean>>
}