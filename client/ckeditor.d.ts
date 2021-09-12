declare module '@ckeditor/ckeditor5-react' {
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import Event from '@ckeditor/ckeditor5-utils/src/eventinfo';
  import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
  import * as React from 'react';
  export default class Ckeditor extends React.Component {
    constructor({ disabled }: { disabled?: boolean }); // this part needs to be fullfilled with your needs
  }
}
