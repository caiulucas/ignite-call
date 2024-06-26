import { Box, styled, Text } from '@ignite-ui/react';

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  width: '100%',

  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px'
      },
      false: {
        maxWidth: 540,
        gridTemplateColumns: '1fr'
      }
    }
  }
});

export const TimePicker = styled('div', {
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'auto',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280
});

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',

  span: {
    color: '$gray200',
    textTransform: 'none  '
  }
});

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
  paddingBottom: '$6',

  '@media(min-width: 900px)': {
    gridTemplateColumns: '1fr 1fr'
  }
});

export const TimePickerItem = styled('button', {
  border: 0,
  backgroundColor: '$gray600',
  padding: '$2 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',

  '&:disabled': {
    background: 'none',
    cursor: 'pointer',
    opacity: 0.4
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$gray500'
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100'
  }
});
