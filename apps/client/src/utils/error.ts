/**
 * 从错误对象中提取消息，如果是 Error 实例则返回 error.message，否则返回 fallback
 */
export const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;
