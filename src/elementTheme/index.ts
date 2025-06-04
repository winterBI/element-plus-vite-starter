import tinycolor from 'tinycolor2'
import defaultTheme from './config/defailt'

export interface ThemeConfig {
  primary?: string // 主色，如 #409EFF
  success?: string // 成功色，如 #67C23A
  warning?: string // 警告色，如 #E6A23C
  danger?: string // 危险色，如 #F56C6C
  error?: string // 危险色，如 #F56C6C
  info?: string // 信息色，如 #909399
  text?: {
    // 文本色
    primary?: string // 主要文本，如 #303133
    regular?: string // 常规文本，如 #606266
    secondary?: string // 次要文本，如 #909399
    placeholder?: string // 占位文本，如 #A8ABB2
    disabled?: string // 占位文本，如 #C0C4CC
    [key: string]: string
  }
  border?: {
    // 边框色
    darker?: string // 更深色边框，如 #CDD0D6
    dark?: string // 深色边框，如 #D4D7DE
    base?: string // 基础边框，如 #DCDFE6
    light?: string // 浅色边框，如 #E4E7ED
    lighter?: string // 更浅边框，如 #EBEEF5
    extraLight?: string // 最浅边框，如 #F2F6FC
  }
  bg?: {
    // 背景色
    base?: string // 基础背景，如 #F5F7FA
    page?: string // 页面背景，如 #F2F3F5
    overlay?: string // 浮层背景，如 #FFFFFF
  }
}

export type ThemeConfigKey = 'default'

/**
 * 设置主题
 * @param key
 */
export function setTheme(key: ThemeConfigKey = 'default') {
  setThemeStyle(getThemeConfig(key))
}

/**
 * 获取主题配置
 * @param key 主题配置key
 * @returns ThemeConfig
 */
function getThemeConfig(key: ThemeConfigKey) {
  return {
    default: defaultTheme,
  }[key]
}

/**
 * 生成 Element Plus 颜色变量，并设置到html覆盖默认主题
 * @param config 配置
 */
function setThemeStyle(config: ThemeConfig) {
  // 生成 CSS 变量
  const cssVariables = generateElementColors(config)

  // 动态插入到 <head> 的 <style> 中
  const style = document.createElement('style')
  style.textContent = cssVariables
  document.head.appendChild(style)

  // document.style.cssText = cssVariables

  console.log('Element Plus 主题颜色已覆盖！')
}

/**
 * 生成 Element Plus 颜色变量，并覆盖默认主题
 * @param options - 颜色配置
 */
function generateElementColors(options: ThemeConfig): string {
  const cssVariables: string[] = [
    'color-scheme: normal;',
  ]

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
      cssVariables.push(...generateColorVariants(colorType, colorValue as string))
    }
  })

  // 生成文本色
  if (options.text) {
    for (const key in options.text) {
      const v = options.text[key] as any
      if (v) {
        cssVariables.push(`--ep-text-color-${key}: ${v};`)
      }
    }
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
    const lightColor = setColorMixLevel(baseColor, level, '#ffffff')
    variants.push(`--ep-color-${colorName}-light-${level}: ${lightColor};`)
  })

  // dark-2
  const darkColor = setColorMixLevel(baseColor, 2, '#000000')
  variants.push(`--ep-color-${colorName}-dark-2: ${darkColor};`)

  return variants
}

/**
 * 设置混合色
 * @param baseColor - 基础色值
 * @param number - 混合比例（0-10）
 * @param mixColor - 混合色，默认为白色
 */
function setColorMixLevel(baseColor: string, number: number, mixColor = '#ffffff'): string {
  return tinycolor
    .mix(
      mixColor,
      baseColor,
      ((10 - number) / 10) * 100, // 转换为百分比 (10% - 90%)
    )
    .toHexString()
    .toLowerCase()
}
