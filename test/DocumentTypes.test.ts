import * as assert from 'assert'
import makeTest from './makeTest'
import { TextDocument } from './mocks'
import Standard from '../src/Parsers/Standard'
import Markdown from '../src/Parsers/Markdown'

import { fromDocument } from '../src/DocumentTypes'

suite("Document Types", () => {

  // All vscode-supported languages need to be tested, but that should be done
  // as part of the language integration tests
  suite("Return javascript processor for `javascript` language id", () => {

    const expected = new Standard(
            { start: '\\/\\*\\*?', end: '\\*\\/', line: '\\/{2,3}' })

    test("With no extension", () => {
      const doc = new TextDocument("", 'untitled', 'javascript')
          , handler = fromDocument(doc)
      
      assert.deepEqual(handler, expected)
    })

    test("With .md extension", () => {
      const doc = new TextDocument("", 'test.md', 'javascript')
          , handler = fromDocument(doc)
      
      assert.deepEqual(handler, expected)    
    })
  })

  test("Return Haskell processor for `plaintext` language id and 'hs' extension", () => {

    const expected = new Standard({ start: '{-', end: '-}', line: '--' })
        , doc = new TextDocument("", 'test.hs', 'plaintext')
        , handler = fromDocument(doc)

    assert.deepEqual(handler, expected)
  })

})