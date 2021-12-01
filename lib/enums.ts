export enum EBackground {
  black   = '\x1b[40m',
  blue    = '\x1b[44m',
  green   = '\x1b[42m',
  red     = '\x1b[41m',
  white   = '\x1b[47m',
  yellow  = '\x1b[43m',
}

export enum EForeground {
  black   = '\x1b[30m',
  blue    = '\x1b[34m',
  green   = '\x1b[32m',
  red     = '\x1b[31m',
  white   = '\x1b[37m',
  yellow  = '\x1b[33m',
}

export enum EUtilities {
  blink      = '\x1b[5m',
  dim        = '\x1b[2m',
  hidden     = '\x1b[8m',
  italic     = '\x1b[3m',
  reset      = '\x1b[0m',
  reverse    = '\x1b[7m',
  strong     = '\x1b[1m',
  underline  = '\x1b[4m',
}