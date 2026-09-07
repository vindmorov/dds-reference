export type ProductStage =
  | 'landing'
  | 'account'
  | 'upload'
  | 'business-context'
  | 'importing'
  | 'distribution-summary'
  | 'transaction-review'
  | 'category-setup'
  | 'import-complete'
  | 'analytics';

export type AppRoute = 'overview' | 'activity' | 'mobile-detail' | 'create-article';

export interface DDSFlowState {
  stage: ProductStage;
  route: AppRoute;
  importId: string | null;
  importedFileName: string | null;
  unresolvedTransactionCount: number;
  reviewProgress: number;
}

export const initialDDSFlowState: DDSFlowState = {
  stage: 'analytics',
  route: 'overview',
  importId: null,
  importedFileName: null,
  unresolvedTransactionCount: 0,
  reviewProgress: 0,
};
