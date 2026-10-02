import { Vendor } from "@/types/vendor";

export function saveVendor(vendor: Vendor) {
    localStorage.setItem("vendor", JSON.stringify(vendor));
}

export function getVendor(): Vendor | null {
    const vendor = localStorage.getItem("vendor");

    if (!vendor) {
        return null;
    }
    return JSON.parse(vendor);
}

export function clearVendor() {
    localStorage.removeItem("vendor");
}