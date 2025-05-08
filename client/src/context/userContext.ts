// import { type ReactNode, useState, createContext } from "react";
// import { User, type UserAttributes } from "../api/routes/user/user";


// interface UserContextData {
//   user: User | undefined;
//   setUser(userAttributes: UserAttributes): void;
// }

// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserContext = createContext({} as UserContextData);

// export function UserProvider({ children }: UserProviderProps) {
//   const [user, setUserState] = useState<UserAttributes | undefined>(undefined);

//   const setUser = (userAttributes: UserAttributes) => {
//     setUserState(userAttributes);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }
