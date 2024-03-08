export interface CustomerTable {
    id: number | null;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}

export interface ItemTable {
    id: number;
    name: string;
    code: string;
    price: number;
    vatRate: number;
    description: string
}

export type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    deactivatedAt: string;
    isDeleted: boolean;
    deletedAt: string;
    invoices: Invoice[];
}

export type Invoice = {
    id: number;
    invoiceDate: string;
    invoiceNumber: string;
    customerId: number;
    totalAmount: number;
    totalVatAmount: number;
    totalDiscountAmount: number;
    isPaid: boolean;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    user: string;
    invoiceLines: InvoiceLine[];
    totalWovat: number;
}

export type Item = {
    id: number;
    name: string;
    code: string;
    price: number;
    description: string;
    isActive: boolean;
    deactivatedAt: string;
    isDeleted: boolean;
    deletedAt: string;
    itemType: number;
    vatRate: number;
    createdAt: Date;
    updatedAt: Date;
    weight: number;
    length: number;
    width: number;
    height: number;
    sku: string;
    barcode: string;
    quantity: number;
    manufacturer: string;
    brand: string;
    model: string;
    color: string;
    size: string;
    material: string;
    countryOfOrigin: string;
    warranty: string;
    supplier: string;
    uom: string;
}

export type InvoiceLine = {
    itemId: number;
    itemName: string;
    itemCode: string;
    vatRate: number;
    quantity: number;
    uom: string;
    unitPrice: number;
    discountPercent: number;
    notes: string;
}

export type InvoiceDTO = {
    invoiceDate: string; //date-time 
    invoiceNumber: string;
    customerId: number;
    totalAmount: number;
    totalVatAmount: number;
    totalDiscountAmount: number;
    isPaid: boolean;
    notes?: string | null;
    user?: string | null;
    invoiceLines: InvoiceLine[];
}

export type CustomerDTO = {
    id?: number | null;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}
export type ItemDTO = {
    id?: number | null;
    name: string;
    code: string;
    price: number;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}