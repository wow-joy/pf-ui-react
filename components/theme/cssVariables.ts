const cssVariables = (name: string, defaultValue?: string) => `var(${name}, ${defaultValue})`;

const cssVariablesMap = {
  WjA1_1: cssVariables('--wj-A1_1', '#06AEA6'),
  WjA1_2: cssVariables('--wj-A1_2', '#1AC3BB'),
  WjA1_3: cssVariables('--wj-A1_3', '#4A9591'),
  WjA1_4: cssVariables('--wj-A1_4', '#E3F8F5'),
  WjA1_5: cssVariables('--wj-A1_5', '#D8F6F5'),
  WjA2_1: cssVariables('--wj-A2_1', '#FEB034'),
  WjA2_2: cssVariables('--wj-A2_2', '#FFC569'),
  WjA2_3: cssVariables('--wj-A2_3', '#E7A02F'),
  WjA3_1: cssVariables('--wj-A3_1', '#F36969'),
  WjA3_2: cssVariables('--wj-A3_2', '#FA8383'),
  WjA3_3: cssVariables('--wj-A3_3', '#D45353'),
  WjC1: cssVariables('--wj-C1', '#FFFFFF'),
  WjC2: cssVariables('--wj-C2', '#F5F7F8'),
  WjC3: cssVariables('--wj-C3', '#F8F8F8'),
  WjC4: cssVariables('--wj-C4', '#F4F5F6'),
  WjC5: cssVariables('--wj-C5', '#EEEEEE'),
  WjC6: cssVariables('--wj-C6', '#F5F5F5'),
  WjC7: cssVariables('--wj-C7', '#D1D1D1'),
  WjC8: cssVariables('--wj-C8', '#C1C1C1'),
  WjC9: cssVariables('--wj-C9', '#DBDBDB'),
  WjC10: cssVariables('--wj-C10', '#979797'),
  WjC11: cssVariables('--wj-C11', '#E8E8E8'),
  WjC12: cssVariables('--wj-C12', '#F0F0F0'),
  WjC13: cssVariables('--wj-C13', '#E6E6E6'),
  WjC14: cssVariables('--wj-C14', '#B3B3B3'),
  WjC15: cssVariables('--wj-C15', '#C1C1C1'),
  WjC16: cssVariables('--wj-C16', '#FAFAFA'),
  WjC17: cssVariables('--wj-C17', '#F9F9F9'),
  WjD1: cssVariables('--wj-D1', '#53BDE7'),
  WjD2: cssVariables('--wj-D2', '#3AC9A8'),
  WjD3: cssVariables('--wj-D3', '#F88464'),
  WjD4: cssVariables('--wj-D4', '#FFBF47'),
  WjD5: cssVariables('--wj-D5', '#A5B8D1'),
  WjD6: cssVariables('--wj-D6', '#FFFBE0'),
  WjD7: cssVariables('--wj-D7', '#E7F9F7'),
  WjD8: cssVariables('--wj-D8', '#E1F0EF'),
  WjE1: cssVariables('--wj-E1', '#333'),
  WjE2: cssVariables('--wj-E2', '#666'),
  WjE3: cssVariables('--wj-E3', '#999'),
  WjE4: cssVariables('--wj-E4', '#CCC'),
  WjE5: cssVariables('--wj-E5', '#E48D02'),
  WjE1_1: cssVariables('--wj-E1_1', '#F36969'),
  WjE1_2: cssVariables('--wj-E1_2', '#FFF4F2'),
  WjE2_1: cssVariables('--wj-E2_1', '#FF9B54'),
  WjE2_2: cssVariables('--wj-E2_2', '#FFFAF2'),
  WjE3_1: cssVariables('--wj-E3_1', '#4ACFB1'),
  WjE3_2: cssVariables('--wj-E3_2', '#ECFBFB'),
  WjE4_1: cssVariables('--wj-E4_1', '#45A8E6'),
  WjE4_2: cssVariables('--wj-E4_2', '#F2FCFF'),
  WjE5_1: cssVariables('--wj-E5_1', '#24BEE8'),
  WjE5_2: cssVariables('--wj-E5_2', '#F4FCFF'),
  WjF1: cssVariables('--wj-F1', '#68D1BE'),
  WjF2: cssVariables('--wj-F2', '#28BEA3'),
  WjF3: cssVariables('--wj-F3', '#14AB90'),
  WjF4: cssVariables('--wj-F4', '#0D8F78'),
  WjF1_1: cssVariables('--wj-F1_1', '#3B8FD9'),
  WjF1_2: cssVariables('--wj-F1_2', '#1A78B8'),
  WjF1_3: cssVariables('--wj-F1_3', '#1A78B8'),
  WjF1_4: cssVariables('--wj-F1_4', '#73461D'),
  WjF1_5: cssVariables('--wj-F1_5', '#CCC'),
};

export default {
  colorPrimary: cssVariablesMap.WjA1_1,
  colorPrimaryHover: cssVariablesMap.WjA1_2,
  colorPrimaryActive: cssVariablesMap.WjA1_3,
  ...cssVariablesMap,
};
