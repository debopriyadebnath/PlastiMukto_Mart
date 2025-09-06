export interface SupabaseConfig {
  url: string
  anonKey: string
  serviceRoleKey: string
}

export interface StorageBucket {
  name: string
  public: boolean
}

export interface UploadOptions {
  cacheControl?: string
  upsert?: boolean
  contentType?: string
}

export interface StorageError {
  message: string
  statusCode?: string
  error?: string
}
