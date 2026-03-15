import type { Meta, StoryObj } from '@storybook/react';
import { SearchComponent } from './SearchComponent';

const meta: Meta<typeof SearchComponent> = {
  title: 'Components/SearchComponent',
  component: SearchComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Full-page search form backed by a Payload CMS search endpoint. ' +
          'Pass `payloadUrl` from the consuming site\'s environment variable. ' +
          'Configure cross-site result URLs with `defaultResultBaseUrl` and `resultBaseUrls`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SearchComponent>;

const sharedArgs = {
  searchLabel: 'Search for content',
  searchButton: 'Search',
  searchMainHeading: 'Search results for:',
  searchResultLabel: 'results',
  searchNoResults: 'No results.',
  searchSiteName: 'Site: ',
  searchContentType: 'Content type: ',
  payloadUrl: 'https://example.com',
};

export const A11yingFrontEnglish: Story = {
  name: 'a11ying-front (English)',
  args: {
    ...sharedArgs,
    searchLocale: 'en',
    defaultResultBaseUrl: '/',
    resultBaseUrls: {
      reqpages: 'https://wcag.a11y.ing/',
      criteria: 'https://wcag.a11y.ing/',
      guidelines: 'https://wcag.a11y.ing/',
      principles: 'https://wcag.a11y.ing/',
    },
  },
};

export const A11yingFrontFinnish: Story = {
  name: 'a11ying-front (Finnish)',
  args: {
    ...sharedArgs,
    searchLabel: 'Hae sisältöä',
    searchButton: 'Hae',
    searchMainHeading: 'Hakutulokset haulle:',
    searchResultLabel: 'tulosta',
    searchNoResults: 'Ei tuloksia.',
    searchSiteName: 'Sivusto: ',
    searchContentType: 'Sisällön tyyppi: ',
    searchLocale: 'fi',
    defaultResultBaseUrl: '/',
    resultBaseUrls: {
      reqpages: 'https://wcag.a11y.ing/',
      criteria: 'https://wcag.a11y.ing/',
      guidelines: 'https://wcag.a11y.ing/',
      principles: 'https://wcag.a11y.ing/',
    },
  },
};

export const WcagFrontEnglish: Story = {
  name: 'wcag-front (English)',
  args: {
    ...sharedArgs,
    searchLocale: 'en',
    defaultResultBaseUrl: 'https://a11y.ing/',
    resultBaseUrls: {
      reqpages: '/',
      criteria: '/',
      guidelines: '/',
      principles: '/',
    },
  },
};
