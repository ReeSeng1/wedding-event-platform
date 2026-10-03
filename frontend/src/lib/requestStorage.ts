import { VendorRequest } from "@/types/vendor";

export function saveRequest(request: VendorRequest) {
    const requests = getRequests();
    localStorage.setItem(
        "requests",
        JSON.stringify([...requests, request])
    );
}

export function getRequests(): VendorRequest[] {
    const requests = localStorage.getItem("requests");

    if (!requests) {
        return [];
    }
    return JSON.parse(requests);
}
export function updateRequestStatus(
    index: number,
    status: VendorRequest["status"]
) {
    const requests = getRequests();

    if (!requests[index]) {
        return;
    }

    requests[index].status = status;

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );
}