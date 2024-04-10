'use client'

import { createContext, useContext, useState } from "react"

// Creating Context
// Wrapping our app
// export our Custom Hook

//First lets define our context

interface IContextValue {
    // roundTime: number
    // numberOfRounds: number
    // numberOfPeople: number
    // Team1Name: string
    // Team2Name: string

    // tip: number | undefined
    // setTip: (tip: number | undefined) => void
    // bill: number
    // setBill: (bill: number) => void
    // groupSize: number
    // setGroupSize: (groupSize: number) => void
    // isCustom: boolean
    // setIsCustom: (isCustom: boolean) => void
}

// {} as IContextValue is just giving placeholder values
export const Context = createContext<IContextValue>({} as IContextValue);

// functional component to pass the provided context to our children
export const AppWrapper = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
    // const [tip, setTip] = useState<number | undefined>(undefined);
    // const [bill, setBill] = useState<number>(0);
    // const [groupSize, setGroupSize] = useState<number>(0);
    // const [isCustom, setIsCustom] = useState<boolean>(false);

    return(
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}


export const useAppContext = () => {
    return useContext(Context);
}
