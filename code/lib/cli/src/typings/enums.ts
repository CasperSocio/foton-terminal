/**
 * ANSI formatting code for background color
 */
export enum StyleBackgroundColor {
  black   = '\x1b[40m',
  blue    = '\x1b[44m',
  cyan    = '\x1b[46m',
  green   = '\x1b[42m',
  magenta = '\x1b[45m',
  red     = '\x1b[41m',
  white   = '\x1b[47m',
  yellow  = '\x1b[43m',
}

/**
 * ANSI formatting codes for text color
 */
export enum StyleColor {
  black   = '\x1b[30m',
  blue    = '\x1b[34m',
  cyan    = '\x1b[36m',
  green   = '\x1b[32m',
  magenta = '\x1b[35m',
  red     = '\x1b[31m',
  white   = '\x1b[37m',
  yellow  = '\x1b[33m',
}

/**
 * ANSI formatting codes for text decoration
 */
export enum StyleTextDecoration {
  italic     = '\x1b[3m',
  strong     = '\x1b[1m',
  underline  = '\x1b[4m',
}

/**
 * ANSI formatting codes for utilities/other
 */
 export enum StyleUtilities {
  blink      = '\x1b[5m',
  dim        = '\x1b[2m',
  hidden     = '\x1b[8m',
  reset      = '\x1b[0m',
  reverse    = '\x1b[7m',
}
