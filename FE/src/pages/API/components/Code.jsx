import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import clsx from 'clsx';
import { format } from 'prettier';
import babel from 'prettier/plugins/babel';
import estree from 'prettier/plugins/estree';
import typescript from 'prettier/plugins/typescript';
import html from 'prettier/plugins/html';
import postcss from 'prettier/plugins/postcss';

function Code({
  value,
  onChange,
  className,
  theme = 'vs-dark',
  defaultLanguage = 'javascript',
  height = 'auto',
  format: enableFormat = true,
  ...props
}) {
  const editorRef = useRef(null);

  // Format code using Prettier with new plugin syntax
  const formatWithPrettier = async (code, language) => {
    try {
      let parser;
      let plugins = [];

      switch (language) {
        case 'javascript':
        case 'jsx':
          parser = 'babel';
          plugins = [babel, estree];
          break;
        case 'typescript':
        case 'tsx':
          parser = 'typescript';
          plugins = [typescript, estree];
          break;
        case 'css':
        case 'scss':
        case 'less':
          parser = 'css';
          plugins = [postcss];
          break;
        case 'html':
          parser = 'html';
          plugins = [html];
          break;
        case 'json':
          parser = 'json';
          plugins = [babel, estree];
          break;
        default:
          parser = 'babel';
          plugins = [babel, estree];
      }

      const formatted = await format(code, {
        parser,
        plugins,
        arrowParens: 'always',
        bracketSameLine: true,
        bracketSpacing: true,
        jsxSingleQuote: true,
        printWidth: 100,
        semi: true,
        singleAttributePerLine: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      });

      return formatted;
    } catch (error) {
      console.warn('Prettier formatting failed:', error);
      return code;
    }
  };

  // Format document in editor
  const formatDocument = async (editor) => {
    try {
      const model = editor.getModel();
      if (!model) return;
      const content = model.getValue();

      const supportedLanguages = ['javascript', 'typescript', 'jsx', 'tsx', 'json', 'css', 'html'];

      if (supportedLanguages.includes(defaultLanguage)) {
        const formattedCode = await formatWithPrettier(content, defaultLanguage);
        model.setValue(formattedCode);
      } else {
        // Fallback to Monaco's built-in formatter
        const formatAction = editor.getAction('editor.action.formatDocument');
        if (formatAction) {
          await formatAction.run();
        } else if (defaultLanguage === 'json') {
          // JSON fallback
          try {
            const parsed = JSON.parse(content);
            model.setValue(JSON.stringify(parsed, null, 2));
          } catch (e) {
            console.warn('Failed to parse JSON for formatting:', e);
          }
        }
      }
    } catch (error) {
      console.warn('Format failed:', error);
    }
  };

  const prepareValue = (val) => {
    if (typeof val === 'string') return val;
    if (defaultLanguage === 'json') return JSON.stringify(val, null, 2);
    return JSON.stringify(val, null, 2);
  };

  const beforeMount = (monaco) => {
    // Register custom format command
    monaco.editor.registerCommand('editor.action.prettierFormat', () => {
      if (editorRef.current) {
        formatDocument(editorRef.current);
      }
    });

    // Add keybinding for format (Shift+Alt+F)
    monaco.editor.addKeybindingRule({
      keybinding: monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      command: 'editor.action.prettierFormat',
      when: 'editorTextFocus',
    });
  };

  return (
    <Editor
      defaultLanguage={defaultLanguage}
      value={prepareValue(value)}
      onChange={onChange}
      height={height}
      theme={theme}
      className={clsx('w-full min-h-[500px]', className)}
      beforeMount={beforeMount}
      onMount={(editor) => {
        editorRef.current = editor;
        if (!enableFormat) return;

        // Wait for editor to fully initialize
        setTimeout(() => formatDocument(editor), 300);
      }}
      options={{
        minimap: { enabled: false },
        fontSize: 12,
        lineHeight: 18,
        showPrintMargin: false,
        showGutter: false,
        highlightActiveLine: true,
        tabSize: 2,
        insertSpaces: true,
        formatOnType: true,
        formatOnPaste: true,
        detectIndentation: false,
        ...props,
      }}
    />
  );
}

export default Code;
