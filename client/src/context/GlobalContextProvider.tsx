import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react"

type GlobalContextType = {
  user: any
  setUser: Dispatch<SetStateAction<any>>,
  mode : "edit" | "view",
  setMode: Dispatch<SetStateAction<"edit" | "view">>,
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

export const GlobalContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(undefined)
  const [mode, setMode] = useState<"edit" | "view">("edit")

  return (
    <GlobalContext.Provider value={{ user, setUser, mode, setMode }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
