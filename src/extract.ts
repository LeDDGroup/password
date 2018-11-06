type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export function extract<A, B>(obj: A, bkeys: (keyof B)[]): [Omit<A, B>, B] {
  const a = Object.assign({}, obj) as any;
  const b = {} as any;
  for (const key of bkeys) {
    b[key] = a[key];
    delete a[key];
  }
  return [a, b];
}
