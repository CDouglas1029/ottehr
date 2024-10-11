import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import React, { ChangeEvent, FC, useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Markdown from 'react-markdown';
import { IntakeThemeContext } from '../../contexts';
import { DescriptionRenderer } from './DescriptionRenderer';

interface UploadComponentProps {
  name: string;
  uploadDescription: string;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadComponent: FC<UploadComponentProps> = ({ name, uploadDescription, handleFileUpload }): JSX.Element => {
  const theme = useTheme();
  const { control } = useFormContext();
  const { otherColors } = useContext(IntakeThemeContext);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <Box
      sx={{
        height: 260,
        border: `1px dashed ${theme.palette.primary.main}`,
        borderRadius: 2,
        display: 'flex',
        background: otherColors.cardBackground,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        gap: 1,
        px: 4,
        mb: 2,
      }}
    >
      <Container style={{ width: '60%', margin: 0, padding: 0 }}>
        <Typography id={`${name}-description`}>
          <Markdown components={{ p: DescriptionRenderer }}>{uploadDescription}</Markdown>
        </Typography>
      </Container>
      <Button
        id={name}
        // component="label"
        aria-labelledby={`${name}-label`}
        aria-describedby={`${name}-description`}
        variant="contained"
        sx={{ textTransform: 'none', mt: 2 }}
        onKeyDown={(event) => {
          try {
            if (['Enter', 'Space'].includes(event.code)) {
              inputRef.current?.click();
            }
          } catch (error) {
            console.error(error);
          }
        }}
        onClick={() => {
          try {
            if (inputRef?.current) {
              inputRef?.current?.click();
            } else {
              throw new Error('inputRef is not defined');
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Upload
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <input
                {...field}
                ref={inputRef}
                value={value?.filename}
                type="file"
                accept="image/png, image/jpeg, image/jpg, application/pdf"
                hidden
                disabled={false}
                onChange={(e) => onChange(handleFileUpload(e))}
              />
            );
          }}
        />
      </Button>
    </Box>
  );
};

export default UploadComponent;
