// Gets editor settings from the environment
export default { getOptions }

import { TextEditor, workspace } from 'vscode'
import { WrappingOptions } from './DocumentProcessor'
import { TextEditorLike } from './Main'

export function getOptions
  ( editor: TextEditorLike
  ) : WrappingOptions 
{
  const wrappingColumn = getWrappingColumn(editor)
      , tabSize = getTabSize(editor, wrappingColumn)
      , doubleSentenceSpacing = 
          getSetting<boolean>(editor, 'rewrap.doubleSentenceSpacing')
  return { wrappingColumn, tabSize, doubleSentenceSpacing }
}


/** Gets the tab size from the editor, according to the user's settings.
 *  Sanitizes the input. */
function getTabSize(editor: TextEditorLike, wrappingColumn: number): number 
{
  let tabSize = editor.options.tabSize as number
  
  if(!Number.isInteger(tabSize) || tabSize < 1) {
    console.warn(
      "Rewrap: tabSize is an invalid value (%o). " +
      "Using the default of (4) instead.", tabSize
    )
    tabSize = 4
  }
  
  if(tabSize > wrappingColumn / 2) {
    console.warn(
      "Rewrap: tabSize is (%d) and wrappingColumn is (%d). " +
      "Unexpected results may occur.", tabSize, wrappingColumn
    )
  }

  return tabSize
}


/** Gets the wrapping column (eg 80) from the user's settings.  
 *  Sanitizes the input. */
function getWrappingColumn(editor: TextEditorLike): number 
{
  const extensionColumn = getSetting<number>(editor, 'rewrap.wrappingColumn')
      , rulers = getSetting<number[]>(editor, 'editor.rulers')
      , editorColumn = getSetting<number>(editor, 'editor.wrappingColumn')

  let wrappingColumn =
        extensionColumn
        || rulers[0]
        // 300 is the default for 'editor.wrappingColumn' so we check it's not
        // that. If that default changes in vscode this will break.
        || (0 < editorColumn && editorColumn < 300) && editorColumn
        || 80
  
  if(!Number.isInteger(wrappingColumn) || wrappingColumn < 1) {
    console.warn(
      "Rewrap: wrapping column is an invalid value (%o). " +
      "Using the default of (80) instead.", wrappingColumn
    )
    wrappingColumn = 80
  }
  else if(wrappingColumn > 120) {
    console.warn(
      "Rewrap: wrapping column is a rather large value (%d).", wrappingColumn
    )
  }

  return wrappingColumn
}

/** Gets a setting from vscode. Tries to find a setting for the appropriate
 *  language for the editor. */
function getSetting<T>(editor: TextEditorLike, setting: string): T
{
  const language = editor.document.languageId
      , config = workspace.getConfiguration()
      , languageSection = config.get('[' + language + ']')

  return languageSetting<T>(languageSection, setting.split('.')) 
          || config.get<T>(setting)
}

function languageSetting<T>(obj : any, pathParts: string[]): T 
{
  if(!pathParts.length) return undefined

  const [next, ...rest] = pathParts
  if(obj) {
    return obj[pathParts.join('.')] || languageSetting<T>(obj[next], rest)
  }
  else {
    return undefined
  }
}