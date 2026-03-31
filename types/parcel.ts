import { IRiderProfile, IUser } from "./user";

export type DeliveryStatus = "PENDING" | "RIDER_ASSIGNED" | "PICKED_UP" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PAID";
export type ParcelCategory = "PARCEL" | "CARGO";

export interface IParcel {
  id: string;
  trackingCode: string;
  senderId: string;
  riderId?: string;
  title: string;
  category: ParcelCategory;
  weight: number;
  price: number;
  pickupAddress: string;
  receiverName: string;
  receiverPhone: string;
  deliveryAddress: string;
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  sender?: IUser;
  rider?: IRiderProfile;
}

export interface ITrackingStep {
  id: string;
  trackingId: string;
  status: string;
  location?: string;
  message?: string;
  timestamp: Date;
}