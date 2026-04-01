import { IRiderProfile, IUser } from "./user";

export type DeliveryStatus = "PENDING" | "RIDER_ASSIGNED" | "PICKED_UP" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PAID";
export type ParcelCategory = "PARCEL" | "CARGO";

// export interface IParcel {
//   id: string;
//   trackingCode: string;
//   senderId: string;
//   riderId?: string;
//   title: string;
//   category: ParcelCategory;
//   weight: number;
//   price: number;
//   pickupAddress: string;
//   receiverName: string;
//   receiverPhone: string;
//   deliveryAddress: string;
//   deliveryStatus: DeliveryStatus;
//   paymentStatus: PaymentStatus;
//   createdAt: Date;
//   updatedAt: Date;
//   sender?: IUser;
//   rider?: IRiderProfile;
// }

// export interface ITrackingStep {
//   id: string;
//   trackingId: string;
//   status: string;
//   location?: string;
//   message?: string;
//   timestamp: Date;
// }



export interface ITrackingStep {
  id: string;
  trackingId: string;
  status: "PENDING" | "PICKED_UP" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
  message: string;
  timestamp: string; // ISO Date string
}

export interface ITracking {
  id: string;
  parcelId: string;
  status: string;
  steps: ITrackingStep[]; 
}

export interface IParcel {
  id: string;
  trackingCode: string;
  senderId: string;
  riderId: string | null;
  title: string;
  category: "PARCEL" | "CARGO";
  weight: number;
  price: string | number;
  pickupAddress: string;
  receiverName: string;
  receiverPhone: string;
  deliveryAddress: string;
  deliveryStatus: "PENDING" | "PICKED_UP" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PAID" | "UNPAID";
  createdAt: string;
  updatedAt: string;
  
  tracking?: ITracking; 
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IParcelResponse {
  success: boolean;
  message: string;
  meta: IMeta;
  data: IParcel[];
}