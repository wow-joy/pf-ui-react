type FormatKey<T> = T extends `--${infer V1}${infer V2}-${infer V3}`
  ? `${Capitalize<V1>}${V2}${V3}`
  : never;

type FormatColorObj<T> = T extends Record<string, unknown>
  ? {
      [P in keyof T as FormatKey<P>]: T[P];
    }
  : never;

const cssVariables = (name: string, defaultValue?: string) => `var(${name}, ${defaultValue})`;

export const baseColor = {
  '--wj-A1_1': '#06AEA6',
  '--wj-A1_2': '#1AC3BB',
  '--wj-A1_3': '#4A9591',
  '--wj-A1_4': '#E3F8F5',
  '--wj-A1_5': '#D8F6F5',
  '--wj-A2_1': '#FEB034',
  '--wj-A2_2': '#FFC569',
  '--wj-A2_3': '#E7A02F',
  '--wj-A3_1': '#F36969',
  '--wj-A3_2': '#FA8383',
  '--wj-A3_3': '#D45353',
  '--wj-C1': '#FFFFFF',
  '--wj-C2': '#F5F7F8',
  '--wj-C3': '#F8F8F8',
  '--wj-C4': '#F4F5F6',
  '--wj-C5': '#EEEEEE',
  '--wj-C6': '#F5F5F5',
  '--wj-C7': '#D1D1D1',
  '--wj-C8': '#C1C1C1',
  '--wj-C9': '#DBDBDB',
  '--wj-C10': '#979797',
  '--wj-C11': '#E8E8E8',
  '--wj-C12': '#F0F0F0',
  '--wj-C13': '#E6E6E6',
  '--wj-C14': '#B3B3B3',
  '--wj-C15': '#C1C1C1',
  '--wj-C16': '#FAFAFA',
  '--wj-C17': '#F9F9F9',
  '--wj-D1': '#53BDE7',
  '--wj-D2': '#3AC9A8',
  '--wj-D3': '#F88464',
  '--wj-D4': '#FFBF47',
  '--wj-D5': '#A5B8D1',
  '--wj-D6': '#FFFBE0',
  '--wj-D7': '#E7F9F7',
  '--wj-D8': '#E1F0EF',
  '--wj-E1': '#333',
  '--wj-E2': '#666',
  '--wj-E3': '#999',
  '--wj-E4': '#CCC',
  '--wj-E5': '#E48D02',
  '--wj-E1_1': '#F36969',
  '--wj-E1_2': '#FFF4F2',
  '--wj-E2_1': '#FF9B54',
  '--wj-E2_2': '#FFFAF2',
  '--wj-E3_1': '#4ACFB1',
  '--wj-E3_2': '#ECFBFB',
  '--wj-E4_1': '#45A8E6',
  '--wj-E4_2': '#F2FCFF',
  '--wj-E5_1': '#24BEE8',
  '--wj-E5_2': '#F4FCFF',
  '--wj-F1': '#68D1BE',
  '--wj-F2': '#28BEA3',
  '--wj-F3': '#14AB90',
  '--wj-F4': '#0D8F78',
  '--wj-F1_1': '#3B8FD9',
  '--wj-F1_2': '#1A78B8',
  '--wj-F1_3': '#1A78B8',
  '--wj-F1_4': '#73461D',
  '--wj-F1_5': '#CCC',
};
type BaseColor = typeof baseColor;
type BaseColorKey = keyof BaseColor;

const formatKey = (key: BaseColorKey) => {
  const [_, __, _first, ...rest] = key.split('-');
  const first = _first
    .split('')
    .map((v, index) => (index ? v : v.toLocaleUpperCase()))
    .join('');
  return [first, ...rest].join('') as FormatKey<typeof key>;
};

const getCssVariablesMap = (data: BaseColor) => {
  let res = {} as FormatColorObj<BaseColor>;
  Object.entries(data).forEach(([key, value]) => {
    const _key = formatKey(key as BaseColorKey);
    res[_key] = cssVariables(key, value);
  });
  return res;
};

const cssVariablesMap = getCssVariablesMap(baseColor);

export default {
  colorPrimary: cssVariablesMap.WjA1_1,
  colorPrimaryHover: cssVariablesMap.WjA1_2,
  colorPrimaryActive: cssVariablesMap.WjA1_3,
  borderColor: cssVariablesMap.WjC7,
  ...cssVariablesMap,
};
