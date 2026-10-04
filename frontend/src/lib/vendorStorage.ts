import { Vendor, VendorRequest } from "@/types/vendor";

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

export function updateVendorRequestStatus(
    requestId: string,
    status: VendorRequest["status"]
) {
    const vendor = getVendor();

    if (!vendor) {
        return;
    }

    const updatedRequests = vendor.requests.map((request) =>
        request.id === requestId
            ?{ ...request, status}
            :request
    );
    saveVendor({
        ...vendor,
        requests: updatedRequests,
    });
}