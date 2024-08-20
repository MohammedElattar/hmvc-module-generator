import VendorLogoObject from "../interfaces/vendorLogoObject";

export type StoreVendorLogo = Omit<VendorLogoObject, 'id'>
export type UpdateVendorLogo = StoreVendorLogo;