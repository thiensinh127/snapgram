import { Models } from "appwrite";
import { QueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";

type DocumentList = { documents: Models.Document[] };
type InfiniteDocumentList = { pages: DocumentList[]; pageParams: unknown[] };

export const replacePostInDocuments = <T extends { $id: string }>(
  documents: T[],
  updatedPost: T
) => documents.map((post) => (post.$id === updatedPost.$id ? updatedPost : post));

const replacePostInList = (
  data: DocumentList | undefined,
  updatedPost: Models.Document
) => data && { ...data, documents: replacePostInDocuments(data.documents, updatedPost) };

const replacePostInInfiniteList = (
  data: InfiniteDocumentList | undefined,
  updatedPost: Models.Document
) =>
  data && {
    ...data,
    pages: data.pages.map((page) => replacePostInList(page, updatedPost)!),
  };

export const updateCachedPost = (
  queryClient: QueryClient,
  updatedPost: Models.Document
) => {
  queryClient.setQueryData<Models.Document>(
    [QUERY_KEYS.GET_POST_BY_ID, updatedPost.$id],
    updatedPost
  );
  queryClient.setQueriesData<InfiniteDocumentList>(
    { queryKey: [QUERY_KEYS.GET_HOME_POSTS] },
    (data) => replacePostInInfiniteList(data, updatedPost)
  );
  queryClient.setQueriesData<InfiniteDocumentList>(
    { queryKey: [QUERY_KEYS.GET_INFINITE_POSTS] },
    (data) => replacePostInInfiniteList(data, updatedPost)
  );
  queryClient.setQueryData<DocumentList>(
    [QUERY_KEYS.GET_RECENT_POSTS],
    (data) => replacePostInList(data, updatedPost)
  );
};
