export const buildErrors = (err: unknown): string[] => {
  if (!err) {
    return []
  }

  if ((err as Error).message) {
    return [(err as Error).message]
  }

  if (typeof err === 'string') {
    return [err]
  }

  if (Array.isArray(err) && err.every((e) => typeof e === 'string')) {
    return err
  }

  return []
}
