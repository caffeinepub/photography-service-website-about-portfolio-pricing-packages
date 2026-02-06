import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearInquiries(): Promise<void>;
    deleteInquiry(id: bigint): Promise<boolean>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInquiry(id: bigint): Promise<Inquiry | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserRole(user: Principal): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveInquiry(name: string, email: string, phone: string, message: string, timestamp: bigint): Promise<bigint>;
}
