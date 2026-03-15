import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const EnglishPage: Story = {
  args: {
    englishURL: 'about',
    finnishURL: 'tietoa',
    currentPage: 'about',
    currentLang: 'en',
    ariaLabel: 'Language selection',
    languageLabel: 'Language',
  },
};

export const FinnishPage: Story = {
  args: {
    englishURL: 'about',
    finnishURL: 'tietoa',
    currentPage: 'tietoa',
    currentLang: 'fi',
    ariaLabel: 'Kielivalinta',
    languageLabel: 'Kieli',
  },
};

export const FrontPage: Story = {
  args: {
    englishURL: 'front',
    finnishURL: 'front',
    currentPage: 'front',
    currentLang: 'en',
    ariaLabel: 'Language selection',
    languageLabel: 'Language',
  },
};

export const DemoPage: Story = {
  args: {
    englishURL: 'my-demo',
    finnishURL: 'my-demo',
    currentPage: 'my-demo',
    currentLang: 'en',
    type: 'demo',
    ariaLabel: 'Language selection',
    languageLabel: 'Language',
  },
};
