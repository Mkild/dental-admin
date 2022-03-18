declare type I18nt = {
  (key: string | number): string
  (key: string | number, plural: number, options?: TranslateOptions | undefined): string
  (key: string | number, defaultMsg: string, options?: TranslateOptions | undefined): string
  (key: string | number, list: unknown[], options?: TranslateOptions | undefined): string
  (key: string | number, list: unknown[], plural: number): string
  (key: string | number, list: unknown[], defaultMsg: string): string
}
