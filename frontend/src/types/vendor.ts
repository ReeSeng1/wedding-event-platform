export type VendorRequest = {
    id: string;
    clientName: string;
    phoneNumber: string;
    eventType: string;
    eventDate: string;
    eventLocation: string;
    guestCount: string;
    budget: string;
    message: string;
    status: "Pending" | "Approved" | "Rejected";
};
export type Vendor = {
    businessName: string;
    ownerName: string;
    email: string;
    phoneNumber: string;
    password: string;
    category: string;
    location: string;
    description: string;
    serviceName: string;
    serviceDescription: string;
    servicePrice: string;
    portfolioTitle: string;
    portfolioDescription: string;
    portfolioImage: string;
    requests: VendorRequest[];
};

