/**
 * 生成 Element Plus 颜色变量，并覆盖默认主题
 * @param options - 颜色配置
 */
export function generateElementColors(options: {
  primary?: string // 主色，如 #409EFF
  success?: string // 成功色，如 #67C23A
  warning?: string // 警告色，如 #E6A23C
  error?: string // 危险色，如 #F56C6C
  danger?: string // 危险色，如 #F56C6C
  info?: string // 信息色，如 #909399
  text?: { // 文本色
    primary?: string // 主要文本，如 #303133
    regular?: string // 常规文本，如 #606266
    secondary?: string // 次要文本，如 #909399
    placeholder?: string // 占位文本，如 #C0C4CC
  }
  border?: { // 边框色
    base?: string // 基础边框，如 #DCDFE6
    light?: string // 浅色边框，如 #E4E7ED
    lighter?: string // 更浅边框，如 #EBEEF5
    extraLight?: string // 最浅边框，如 #F2F6FC
  }
  bg?: { // 背景色
    base?: string // 基础背景，如 #F5F7FA
    page?: string // 页面背景，如 #F2F3F5
    overlay?: string // 浮层背景，如 #FFFFFF
  }
}): string {
  const cssVariables: string[] = []

  // 生成主色及其变体
  if (options.primary) {
    cssVariables.push(`--ep-color-primary: ${options.primary};`)
    cssVariables.push(...generateColorVariants('primary', options.primary))
  }

  // 生成辅助色及其变体（success/warning/danger/info）
  ['success', 'warning', 'danger', 'error', 'info'].forEach((colorType) => {
    const colorValue = options[colorType as keyof typeof options]
    if (colorValue) {
      cssVariables.push(`--ep-color-${colorType}: ${colorValue};`)
      cssVariables.push(...generateColorVariants(colorType, colorValue))
    }
  })

  // 生成文本色
  if (options.text) {
    const { primary, regular, secondary, placeholder } = options.text
    if (primary)
      cssVariables.push(`--ep-text-color-primary: ${primary};`)
    if (regular)
      cssVariables.push(`--ep-text-color-regular: ${regular};`)
    if (secondary)
      cssVariables.push(`--ep-text-color-secondary: ${secondary};`)
    if (placeholder)
      cssVariables.push(`--ep-text-color-placeholder: ${placeholder};`)
  }

  // 生成边框色
  if (options.border) {
    const { base, light, lighter, extraLight } = options.border
    if (base)
      cssVariables.push(`--ep-border-color: ${base};`)
    if (light)
      cssVariables.push(`--ep-border-color-light: ${light};`)
    if (lighter)
      cssVariables.push(`--ep-border-color-lighter: ${lighter};`)
    if (extraLight)
      cssVariables.push(`--ep-border-color-extra-light: ${extraLight};`)
  }

  // 生成背景色
  if (options.bg) {
    const { base, page, overlay } = options.bg
    if (base)
      cssVariables.push(`--ep-bg-color: ${base};`)
    if (page)
      cssVariables.push(`--ep-bg-color-page: ${page};`)
    if (overlay)
      cssVariables.push(`--ep-bg-color-overlay: ${overlay};`)
  }

  return `:root { ${cssVariables.join('\n')} }`
}

/**
 * 生成颜色的变体（light-3/5/7/8/9 和 dark-2）
 * @param colorName - 颜色名称（如 primary/success）
 * @param baseColor - 基础色值（如 #409EFF）
 */
function generateColorVariants(colorName: string, baseColor: string): string[] {
  const variants: string[] = [];

  // light-3/5/7/8/9
  [3, 5, 7, 8, 9].forEach((level) => {
    const lightColor = lightenColor(baseColor, level * 10)
    variants.push(`--ep-color-${colorName}-light-${level}: ${lightColor};`)
  })

  // dark-2
  const darkColor = darkenColor(baseColor, 20)
  variants.push(`--ep-color-${colorName}-dark-2: ${darkColor};`)

  return variants
}

/**
 * 颜色变浅（模拟 Element Plus 的 lighten 逻辑）
 */
function lightenColor(hex: string, percent: number): string {
  // 这里简化处理，实际项目可以用更精准的算法（如 tinycolor2）
  return hex + Math.floor(percent / 10).toString(16).padStart(2, '0')
}

/**
 * 颜色变深（模拟 Element Plus 的 darken 逻辑）
 */
function darkenColor(hex: string, percent: number): string {
  // 这里简化处理，实际项目可以用更精准的算法
  return hex.replace(/\d+/g, num => Math.max(0, Number.parseInt(num) - percent).toString().toUpperCase())
}
