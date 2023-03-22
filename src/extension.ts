import * as vscode from 'vscode';
import searchSelector from './searchSelector';
import setCssSelectors from './setCssSelectors';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'extension.extractioncssselector',
    async () => {
      const { activeTextEditor, showInformationMessage } = vscode.window;
      if (!activeTextEditor) {
        return;
      }
      const config = vscode.workspace.getConfiguration();
      const insertString = config.get<string[]>('extractioncssselector.insertString') as string[];
      const isIncludeId = config.get<boolean>('extractioncssselector.isIncludeId') as boolean;
      const excludeRegex = config.get<string>('extractioncssselector.excludeRegex') as string;
      const { document, selection } = activeTextEditor;
      const text = document.getText(selection.isEmpty ? undefined : selection);
      const classes = searchSelector({ text, isIncludeId, excludeRegex });
      if (!classes.length) {
        showInformationMessage('classが見つかりませんでした');
        return;
      }
      const { clipboard } = vscode.env;
      await clipboard.writeText(
        setCssSelectors({
          classes,
          insertString,
        })
      );
      showInformationMessage('cssセレクタをクリップボードにコピーしました');
      return;
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
