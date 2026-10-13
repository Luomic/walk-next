export interface DefaultLayoutProps {
  /** 是否显示导航栏
   * @default true
   */
  showNavbar?: boolean;
  /** 是否显示顶部 Logo
   * @default false
   */
  showLogo?: boolean;
  /** main 区域是否不设内边距
   * @default false
   */
  noPadding?: boolean;
  /** 背景装饰图变体：default 仅顶部，topAndBottom 顶部与底部都显示
   * @default "default"
   */
  bgDecorationVariant?: "default" | "topAndBottom";
}
