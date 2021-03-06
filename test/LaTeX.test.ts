import * as assert from 'assert'
import * as Tests from './Tests'

import LaTeX from '../src/Parsers/LaTeX'


suite("LaTeX:", () => 
{
  const test = 
          Tests.makeTestFunction
            ( new LaTeX()
            , { wrappingColumn: 16, tabSize: 2, doubleSentenceSpacing: false }
            )
      , _ = null as string

    test
      ( "a" , "a b"
      , "b" , _
      )

    test
      ( "a" , "a"
      , ""  , ""
      , "b" , "b"
      )

    test
      ( "  abcdef ghijkl mnopqr" , "  abcdef ghijkl"
      , _                        , "  mnopqr"
      )

    test
      ( "  \\a b" , "  \\a b"
      , "  \\a c" , "  \\a c"
      )

    test
      ( "  \\a b" , "  \\a b c"
      , "      c" , "  \\a d"
      , "  \\a d" , _
      )

    suite("Line breaks:", () =>
    {
      test
        ( "\\a \\\\" , "\\a \\\\"
        , "b"        , "b"
        )

      test
        ( "\\a \\\\*" , "\\a \\\\*"
        , "b"         , "b"
        )

      test
        ( "\\a \\\\[2in]" , "\\a \\\\[2in]"
        , "b"             , "b"
        )

      test
        ( "\\a \\newline" , "\\a \\newline"
        , "b"             , "b"
        )

      test
        ( "\\a \\linebreak[4]" , "\\a \\linebreak[4]"
        , "b"                  , "b"
        )

    })
})