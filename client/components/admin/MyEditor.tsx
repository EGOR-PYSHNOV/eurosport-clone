import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import { FormHelperText, Typography } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';

const MyEditor: React.FC<any> = ({ data }) => {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ margin: '10px 10px 40px 10px' }}>
      <Typography color="primary" gutterBottom>
        Text
      </Typography>
      <Controller
        name="text"
        control={control}
        defaultValue={''}
        render={({ field }) => (
          <>
            <CKEditor
              editor={ClassicEditor}
              config={{
                ckfinder: { uploadUrl: 'https://eurosport-clone-server.herokuapp.com/upload-file' },
              }}
              onInit={(editor: {
                editing: {
                  view: {
                    change: (arg0: (writer: any) => void) => void;
                    document: { getRoot: () => any };
                  };
                };
              }) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle({ height: '200px' }, editor.editing.view.document.getRoot());
                });
                //@ts-ignore
                editor.setData(data);
                setValue('text', data);
              }}
              {...field}
              //@ts-ignore
              onChange={(event, editor) => {
                const data = editor.getData();

                field.onChange(event);
                setValue('text', data);
              }}
            />
            <FormHelperText error>{errors.text?.message}</FormHelperText>
          </>
        )}></Controller>
    </div>
  );
};

export default MyEditor;
