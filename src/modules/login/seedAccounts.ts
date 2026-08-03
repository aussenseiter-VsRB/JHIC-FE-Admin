export interface SeedAccount {
  label: string;
  group: "Admin" | "Jurnal" | "Guru";
  email: string;
  password: string;
  note: string;
}

export const SEED_ACCOUNTS: SeedAccount[] = [
  { label: "Admin", group: "Admin", email: "admin@jhic.com", password: "admin123", note: "Kelola user & lihat semua PKL" },
  { label: "Jurnalis", group: "Jurnal", email: "jurnal@jhic.com", password: "jurnal123", note: "Buat & kelola berita" },
  { label: "Wali Kelas PPLG 1", group: "Guru", email: "pplg-1@jhic.com", password: "guru123", note: "wali_kelas" },
  { label: "Guru BK", group: "Guru", email: "bk@jhic.com", password: "guru123", note: "guru bk" },
  { label: "Guru Kesiswaan", group: "Guru", email: "kesiswaan@jhic.com", password: "guru123", note: "kesiswaan" },
  { label: "Kaprog PPLG", group: "Guru", email: "kaprog-PPLG@jhic.com", password: "guru123", note: "kaprog" },
];

export const SEED_GROUPS = ["Admin", "Jurnal", "Guru"] as const;