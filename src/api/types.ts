export type Role = 'user' | 'guru' | 'jurnal' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  avatar_url?: string
  class?: string
  jurusan?: string
  position?: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface Berita {
  id: string
  author_id: string
  title: string
  content: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface PklStep {
  id: string
  request_id: string
  position: string
  approver_id: string
  status: string
  note?: string
  sequence: number
  decided_at?: string
  created_at: string
  updated_at: string
}

export interface PklRequest {
  id: string
  requester_id: string
  company: string
  location: string
  start_date: string
  end_date: string
  description: string
  status: string
  cancel_reason?: string
  current_step: number
  created_at: string
  updated_at: string
  steps?: PklStep[]
}