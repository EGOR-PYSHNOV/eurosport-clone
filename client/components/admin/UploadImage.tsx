import { Button, Typography } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';

import { useFormContext } from 'react-hook-form';

const customImgLoader = ({ src }: any): string => {
  return `${src}`;
};

export const UploadImage: React.FC<{ image: string }> = ({ image }) => {
  const { register } = useFormContext();
  const [file, setFile] = React.useState<string>(image);

  const imageInput = register('image');

  return (
    <div style={{ margin: '10px' }}>
      <Typography color="primary" gutterBottom>
        Image
      </Typography>

      <Button variant="contained" component="label">
        Upload Image
        <input
          type="file"
          hidden
          {...imageInput}
          onChange={(e) => {
            imageInput.onChange(e); // react hook form onChange
            e.target.files && setFile(URL.createObjectURL(e.target.files[0]));
          }}
          onBlur={imageInput.onBlur}
          ref={imageInput.ref}
        />
      </Button>

      {file && (
        <div style={{ marginTop: '20px' }} className={'image-container'}>
          <Image
            loader={customImgLoader}
            src={file}
            layout="fill"
            objectFit="contain"
            alt="image"
            className={'image'}
          />
        </div>
      )}
    </div>
  );
};
