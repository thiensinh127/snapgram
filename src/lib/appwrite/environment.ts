const requiredKeys = [
  "VITE_APPWRITE_URL",
  "VITE_APPWRITE_PROJECT_ID",
  "VITE_APPWRITE_DATABASE_ID",
  "VITE_APPWRITE_STORAGE_ID",
  "VITE_APPWRITE_USER_COLLECTION_ID",
  "VITE_APPWRITE_POST_COLLECTION_ID",
  "VITE_APPWRITE_SAVES_COLLECTION_ID",
  "VITE_APPWRITE_BUCKET_ID",
] as const;

type AppwriteEnv = Record<string, string | undefined>;

export const readAppwriteConfig = (env: AppwriteEnv) => {
  const missing = requiredKeys.filter((key) => !env[key]);

  if (missing.length) {
    throw new Error(`Missing Appwrite environment variables: ${missing.join(", ")}. Copy .env.example to .env.local and fill in your Appwrite IDs.`);
  }

  return {
    url: env.VITE_APPWRITE_URL!,
    projectId: env.VITE_APPWRITE_PROJECT_ID!,
    databaseId: env.VITE_APPWRITE_DATABASE_ID!,
    storageId: env.VITE_APPWRITE_STORAGE_ID!,
    userCollectionId: env.VITE_APPWRITE_USER_COLLECTION_ID!,
    postCollectionId: env.VITE_APPWRITE_POST_COLLECTION_ID!,
    saveCollectionId: env.VITE_APPWRITE_SAVES_COLLECTION_ID!,
    bucketId: env.VITE_APPWRITE_BUCKET_ID!,
  };
};
