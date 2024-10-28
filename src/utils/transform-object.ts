export const transformObject = <R extends Record<string, string>>(
  attributes: { key?: string; value?: string; _type: string; _key: string }[] | undefined
): R => {
  if (!Array.isArray(attributes)) {
    return {} as R;
  }

  return attributes.reduce((acc, attribute) => {
    return attribute.key
      ? {
          ...acc,
          [attribute.key]: attribute.value || '',
        }
      : acc;
  }, {} as R);
};
