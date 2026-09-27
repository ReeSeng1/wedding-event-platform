"use client";

import { createContext, useContext, useState, ReactNode} from "react";

type VendorCategory = 
   | "photography"
   | "decoration"
   | "venue"
   | "makeup"
   | "videography"
   | "dress"
   | "music"
   | "cake";

   type VendorSelections = {
    photography: string;
    decoration: string;
    venue: string;
    makeup: string;
    videography: string;
    dress: string;
    music: string;
    cake: string;
   };

type VendorSelectionContextType = {
    selections: VendorSelections;
    selectVendor: (category: VendorCategory, vendor: string) => void;
    removeVendor: (category: VendorCategory) => void;
};

const VendorSelectionContext = createContext<
   VendorSelectionContextType | undefined
>(undefined);

export function VendorSelectionProvider({
    children,
}: {
    children: ReactNode;
}) {
     const [selections, setSelections] = useState<VendorSelections>({
        photography: "",
        decoration: "",
        venue: "",
        makeup: "",
        videography:"",
        dress: "",
        music: "",
        cake:"",
     });
     function selectVendor(category: VendorCategory,vendor: string){
        setSelections((current: VendorSelections) =>({
            ...current,
            [category]: vendor,
        }))
     }
     function removeVendor(category: VendorCategory) {
        setSelections((current: VendorSelections) => ({
            ...current,
            [category]: "",
        }));
     }
     
     return (
        <VendorSelectionContext.Provider
           value={{
               selections,
               selectVendor,
               removeVendor,
           }}>
            {children}
        </VendorSelectionContext.Provider>
     );
}

export function useVendorSelection() {
    const context = useContext(VendorSelectionContext);
    if(!context) {
        throw new Error(
            "useVendorSelection must be used inside VendorSelectionProvider"
        );
    }
    return context;
}