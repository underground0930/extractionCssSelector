import * as vscode from 'vscode';
import searchSelector from './searchSelector';
import setCssSelectors from './setCssSelectors';

const execute = async (filterId: number) => {
  const { activeTextEditor, showInformationMessage } = vscode.window;
  if (!activeTextEditor) {
    return;
  }
  const config = vscode.workspace.getConfiguration();
  const insertString = config.get<string[]>('extractioncssselector.insertString') as string[];
  const isIncludeId = config.get<boolean>('extractioncssselector.isIncludeId') as boolean;
  const excludeRegexArray = config.get<string[]>('extractioncssselector.excludeRegex') as string[];
  const excludeRegex = excludeRegexArray[filterId] ?? '';
  const { document, selection } = activeTextEditor;
  const text = document.getText(selection.isEmpty ? undefined : selection);
  const classes = searchSelector({ text, isIncludeId, excludeRegex: excludeRegex });
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
};

export function activate(context: vscode.ExtensionContext) {
  [...new Array(3)].forEach((_, index) => {
    const disposable = vscode.commands.registerCommand(
      `extractioncssselector.filter${index + 1}`,
      () => execute(index)
    );
    context.subscriptions.push(disposable);
  });
}

export function deactivate() {
  //
}
