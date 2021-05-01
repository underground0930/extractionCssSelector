import * as vscode from "vscode";
import searchSelector from "./searchSelector";
import setCssSelectors from "./setCssSelectors";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.extractionCssSelector",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const { document, selection } = editor;
        const text = document.getText(
          selection.isEmpty ? undefined : selection
        );
        const classes = searchSelector(text);
        if (classes.length > 0) {
          let value = undefined;
          const isInput = await vscode.window.showInformationMessage(
            "セレクタ内に文字列を入力しますか？",
            "Yes",
            "No"
          );
          if (isInput === "Yes") {
            value = await vscode.window.showInputBox({
              prompt: "セレクタ内に入力したい文字列を入力",
            });
          }

          await vscode.env.clipboard.writeText(setCssSelectors(classes, value));

          vscode.window.showInformationMessage(
            "cssセレクタをクリップボードにコピーしました"
          );

          return;
        }
        vscode.window.showInformationMessage("classが見つかりませんでした");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
