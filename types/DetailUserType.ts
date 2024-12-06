import type {UserType} from "~/types/TypesModel";

export interface DetailUserRequestType {
    phone?: number | null;      // Nomor telepon (opsional)
    address?: string | null;    // Alamat (opsional)
    city?: string | null;       // Kota (opsional)
    postalCode?: number | null; // Kode pos (opsional)
    bod?: Date | null;          // Tanggal lahir (opsional)
    user_id: number;            // ID unik pengguna yang terkait
    user?: UserType[] | null;         // Relasi ke User (opsional)
}
