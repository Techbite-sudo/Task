export interface ITEM {
    _id: string,
    title: string,
    type: "Package" | 'Product',
    price: number,
    description?: string,
    image?: string,
    images: [string],
    safariPackage: {
        startPrice?: number,
        endPrice?: number,
        duration?: string,
        location?: string,
        included?: string,
        excluded?: string,
    }
    createdAt: Date
}

export interface SERVICE {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    image?: string;
}

export interface CART_ITEM extends ITEM {
    quantity: number
}

export interface USER {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    photoURL?: string;
}

export interface ORDER {
    _id: string;
    number: string;
    user: USER;
    status: string;
    items: CART_ITEM[];
    payment: {
        paid: boolean;
        reference?: string;
        amount: number
    }
    createdAt: Date
}

export interface HOTEL_BOOKING {
    _id: string;
    destination: string;
    checkInDate: Date,
    checkOutDate: Date,
    guests: number,
    nights: number,
    roomSize: string;
    services: [string],
    extraServices: [string],
    name: string;
    email: string;
    phone: string;
    specialRequest?: string,
    createdAt: Date
}

export interface SAFARI_INQUIRY {
    _id: string;
    item: ITEM;
    name: string;
    email: string;
    phone: string;
    adults: number;
    children: number;
    specialRequest?: string;
    createdAt: Date;
}