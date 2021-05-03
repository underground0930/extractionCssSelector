import * as vscode from "vscode";
import searchSelector from "./searchSelector";
import setCssSelectors from "./setCssSelectors";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.extractionCssSelector",
    async () => {
      const {
        activeTextEditor,
        showInformationMessage,
        showInputBox,
      } = vscode.window;
      if (!activeTextEditor) {
        // アクティブなエディタがない場合
        return;
      }
      const { document, selection } = activeTextEditor;
      const text = document.getText(selection.isEmpty ? undefined : selection);
      const classes = searchSelector(text);
      if (classes.length === 0) {
        // classが見つからない場合
        showInformationMessage("classが見つかりませんでした");
        return;
      }
      const { clipboard } = vscode.env;
      let value = undefined;
      const isInput = await showInformationMessage(
        "セレクタ内に文字列を入力しますか？",
        "Yes",
        "No"
      );
      if (isInput === "Yes") {
        value = await showInputBox({
          prompt: "セレクタ内に入力したい文字列を入力",
        });
      }
      await clipboard.writeText(setCssSelectors(classes, value));
      showInformationMessage("cssセレクタをクリップボードにコピーしました");
      return;
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
