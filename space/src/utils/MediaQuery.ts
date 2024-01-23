import { css, CSSObject } from 'styled-components';

interface Device {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

const device: Device = {
  xs: '400px',
  sm: '600px',
  md: '900px',
  lg: '1280px',
  xl: '1440px',
  xxl: '1920px',
};

type MediaFunction = (template: TemplateStringsArray, ...args: CSSObject[]) => ReturnType<typeof css>;

const generateMedia = (size: keyof Device): MediaFunction => (template, ...args) => css`
  @media (max-width: ${device[size]}) {
    ${css(template, ...args)};
  }
`;

export const media = {
  xs: generateMedia('xs'),
  sm: generateMedia('sm'),
  md: generateMedia('md'),
  lg: generateMedia('lg'),
  xl: generateMedia('xl'),
  xxl: generateMedia('xxl'),
};
