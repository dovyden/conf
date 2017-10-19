module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:jest/recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "plugins": [
        "jest",
        "react"
    ],
    "rules": {
        // Possible Errors  (http://eslint.org/docs/rules/#possible-errors)
        //   for-direction                                // enforce "for" loop update clause moving the counter in the right direction.
        "getter-return": "error",                         // enforce `return` statements in getters
        "no-await-in-loop": "error",                      // disallow `await` inside of loops
        // ✓ no-compare-neg-zero                          // disallow comparing against -0
        // ✓ no-cond-assign                               // disallow assignment operators in conditional expressions
        // ✓ no-console                                   // disallow the use of `console`
        // ✓ no-constant-condition                        // disallow constant expressions in conditions
        // ✓ no-control-regex                             // disallow control characters in regular expressions
        // ✓ no-debugger                                  // disallow the use of `debugger`
        // ✓ no-dupe-args                                 // disallow duplicate arguments in `function` definitions
        // ✓ no-dupe-keys                                 // disallow duplicate keys in object literals
        // ✓ no-duplicate-case                            // disallow duplicate case labels
        "no-empty": ["error", {                           // disallow empty block statements
            "allowEmptyCatch": true
        }],
        // ✓ no-empty-character-class                     // disallow empty character classes in regular expressions
        // ✓ no-ex-assign                                 // disallow reassigning exceptions in `catch` clauses
        // ✓ no-extra-boolean-cast                        // disallow unnecessary boolean casts
        //   no-extra-parens                              // disallow unnecessary parentheses
        // ✓ no-extra-semi                                // disallow unnecessary semicolons
        // ✓ no-func-assign                               // disallow reassigning `function` declarations
        // ✓ no-inner-declarations                        // disallow variable or `function` declarations in nested blocks
        // ✓ no-invalid-regexp                            // disallow invalid regular expression strings in `RegExp` constructors
        // ✓ no-irregular-whitespace                      // disallow irregular whitespace outside of strings and comments
        // ✓ no-obj-calls                                 // disallow calling global object properties as functions
        //   no-prototype-builtins                        // disallow calling some `Object.prototype` methods directly on objects
        // ✓ no-regex-spaces                              // disallow multiple spaces in regular expressions
        // ✓ no-sparse-arrays                             // disallow sparse arrays
        "no-template-curly-in-string": "warn",            // disallow template literal placeholder syntax in regular strings
        // ✓ no-unexpected-multiline                      // disallow confusing multiline expressions
        // ✓ no-unreachable                               // disallow unreachable code after `return`, `throw`, `continue`, and `break` statements
        // ✓ no-unsafe-finally                            // disallow control flow statements in `finally` blocks
        // ✓ no-unsafe-negation                           // disallow negating the left operand of relational operators
        // ✓ use-isnan                                    // require calls to `isNaN()` when checking for `NaN`
        //   valid-jsdoc                                  // enforce valid JSDoc comments
        // ✓ valid-typeof                                 // enforce comparing `typeof` expressions against valid strings

        // Best Practices  (http://eslint.org/docs/rules/#best-practices)
        //   accessor-pairs                               // enforce getter and setter pairs in objects
        "array-callback-return": "warn",                  // enforce `return` statements in callbacks of array methods
        "block-scoped-var": "error",                      // enforce the use of variables within the scope they are defined
        //   class-methods-use-this                       // enforce that class methods utilize `this`
        "complexity": ["error", 20],                      // enforce a maximum cyclomatic complexity allowed in a program
        //   consistent-return                            // require `return` statements to either always or never specify values
        "curly": ["error", "all"],                        // enforce consistent brace style for all control statements
        //   default-case                                 // require `default` cases in `switch` statements
        "dot-location": ["error", "property"],            // enforce consistent newlines before and after dots
        //   dot-notation                                 // enforce dot notation whenever possible
        "eqeqeq": ["error", "always"],                    // require the use of `===` and `!==`
        //   guard-for-in                                 // require `for-in` loops to include an `if` statement
        "no-alert": "error",                              // disallow the use of `alert`, `confirm`, and `prompt`
        "no-caller": "error",                             // disallow the use of `arguments.caller` or `arguments.callee`
        // ✓ no-case-declarations                         // disallow lexical declarations in case clauses
        "no-div-regex": "error",                          // disallow division operators explicitly at the beginning of regular expressions
        //   no-else-return                               // disallow `else` blocks after `return` statements in `if` statements
        //   no-empty-function                            // disallow empty functions
        // ✓ no-empty-pattern                             // disallow empty destructuring patterns
        "no-eq-null": "error",                            // disallow `null` comparisons without type-checking operators
        "no-eval": "error",                               // disallow the use of `eval()`
        "no-extend-native": "error",                      // disallow extending native types
        "no-extra-bind": "warn",                          // disallow unnecessary calls to `.bind()`
        "no-extra-label": "error",                        // disallow unnecessary labels
        // ✓ no-fallthrough                               // disallow fallthrough of `case` statements
        "no-floating-decimal": "error",                   // disallow leading or trailing decimal points in numeric literals
        // ✓ no-global-assign                             // disallow assignments to native objects or read-only global variables
        "no-implicit-coercion": "error",                  // disallow shorthand type conversions
        //   no-implicit-globals                          // disallow variable and `function` declarations in the global scope
        "no-implied-eval": "error",                       // disallow the use of `eval()`-like methods
        //   no-invalid-this                              // disallow `this` keywords outside of classes or class-like objects
        "no-iterator": "error",                           // disallow the use of the `__iterator__` property
        "no-labels": "error",                             // disallow labeled statements
        "no-lone-blocks": "error",                        // disallow unnecessary nested blocks
        "no-loop-func": "warn",                           // disallow `function` declarations and expressions inside loop statements
        //   no-magic-numbers                             // disallow magic numbers
        "no-multi-spaces": ["error", {                    // disallow multiple spaces
            "ignoreEOLComments": true
        }],
        "no-multi-str": "error",                          // disallow multiline strings
        "no-new": "warn",                                 // disallow `new` operators outside of assignments or comparisons
        "no-new-func": "error",                           // disallow `new` operators with the `Function` object
        "no-new-wrappers": "error",                       // disallow `new` operators with the `String`, `Number`, and `Boolean` objects
        // ✓ no-octal                                     // disallow octal literals
        "no-octal-escape": "error",                       // disallow octal escape sequences in string literals
        "no-param-reassign": "warn",                      // disallow reassigning `function` parameters
        "no-proto": "warn",                               // disallow the use of the `__proto__` property
        // ✓ no-redeclare                                 // disallow variable redeclaration
        //   no-restricted-properties                     // disallow certain properties on certain objects
        "no-return-assign": "error",                      // disallow assignment operators in `return` statements
        "no-return-await": "warn",                        // disallow unnecessary `return await`
        "no-script-url": "error",                         // disallow `javascript:` urls
        // ✓ no-self-assign                               // disallow assignments where both sides are exactly the same
        "no-self-compare": "error",                       // disallow comparisons where both sides are exactly the same
        "no-sequences": "error",                          // disallow comma operators
        "no-throw-literal": "error",                      // disallow throwing literals as exceptions
        //   no-unmodified-loop-condition                 // disallow unmodified loop conditions
        "no-unused-expressions": ["error", {              // disallow unused expressions
            "allowTaggedTemplates": true,
            "allowTernary": true
        }],
        // ✓ no-unused-labels                             // disallow unused labels
        "no-useless-call": "warn",                        // disallow unnecessary calls to `.call()` and `.apply()`
        "no-useless-concat": "error",                     // disallow unnecessary concatenation of literals or template literals
        // ✓ no-useless-escape                            // disallow unnecessary escape characters
        "no-useless-return": "error",                     // disallow redundant return statements
        "no-void": "error",                               // disallow `void` operators
        //   no-warning-comments                          // disallow specified warning terms in comments
        "no-with": "error",                               // disallow `with` statements
        //   prefer-promise-reject-errors                 // require using Error objects as Promise rejection reasons
        "radix": ["error", "as-needed"],                  // enforce the consistent use of the radix argument when using `parseInt()`
        "require-await": "error",                         // disallow async functions which have no `await` expression
        //   vars-on-top                                  // require `var` declarations be placed at the top of their containing scope
        "wrap-iife": ["error", "any"],                    // require parentheses around immediate `function` invocations
        "yoda": "error",                                  // disallow "Yoda" conditions

        // Strict Mode  (http://eslint.org/docs/rules/#strict-mode)
        "strict": ["error", "safe"],                      // require strict mode directives

        // Variables  (http://eslint.org/docs/rules/#variables)
        //   init-declarations                            // require or disallow initialization in variable declarations
        //   no-catch-shadow                              // disallow `catch` clause parameters from shadowing variables in the outer scope
        // ✓ no-delete-var                                // disallow deleting variables
        "no-label-var": "error",                          // disallow labels that share a name with a variable
        //   no-restricted-globals                        // disallow specified global variables
        //   no-shadow                                    // disallow variable declarations from shadowing variables declared in the outer scope
        "no-shadow-restricted-names": "error",            // disallow identifiers from shadowing restricted names
        // ✓ no-undef                                     // disallow the use of undeclared variables unless mentioned in `/*global */` comments
        "no-undef-init": "error",                         // disallow initializing variables to `undefined`
        //   no-undefined                                 // disallow the use of `undefined` as an identifier
        // ✓ no-unused-vars                               // disallow unused variables
        "no-use-before-define": ["error", {               // disallow the use of variables before they are defined
            "functions": false
        }],

        // Node.js and CommonJS  (http://eslint.org/docs/rules/#nodejs-and-commonjs)
        //   callback-return                              // require `return` statements after callbacks
        //   global-require                               // require `require()` calls to be placed at top-level module scope
        "handle-callback-err": "error",                   // require error handling in callbacks
        "no-buffer-constructor": "error",                 // disallow use of the `Buffer()` constructor
        //   no-mixed-requires                            // disallow `require` calls to be mixed with regular variable declarations
        //   no-new-require                               // disallow `new` operators with calls to `require`
        //   no-path-concat                               // disallow string concatenation with `__dirname` and `__filename`
        //   no-process-env                               // disallow the use of `process.env`
        //   no-process-exit                              // disallow the use of `process.exit()`
        //   no-restricted-modules                        // disallow specified modules when loaded by `require`
        //   no-sync                                      // disallow synchronous methods

        // Stylistic Issues  (http://eslint.org/docs/rules/#stylistic-issues)
        "array-bracket-newline": ["error", {              // enforce linebreaks after opening and before closing array brackets
            "multiline": true
        }],
        "array-bracket-spacing": ["error", "never"],      // enforce consistent spacing inside array brackets
        //   array-element-newline                        // enforce line breaks after each array element
        "block-spacing": "error",                         // enforce consistent spacing inside single-line blocks
        "brace-style": ["error", "1tbs"],                 // enforce consistent brace style for blocks
        "camelcase": ["error", {                          // enforce camelcase naming convention
            "properties": "never"
        }],
        //   capitalized-comments                         // enforce or disallow capitalization of the first letter of a comment
        //   comma-dangle                                 // require or disallow trailing commas
        "comma-spacing": ["error", {                      // enforce consistent spacing before and after commas
            "before": false,
            "after": true
        }],
        "comma-style": ["error", "last"],                 // enforce consistent comma style
        "computed-property-spacing": ["error", "never"],  // enforce consistent spacing inside computed property brackets
        "consistent-this": ["error", "that"],             // enforce consistent naming when capturing the current execution context
        "eol-last": ["error", "always"],                  // require newline at the end of files
        "func-call-spacing": ["error", "never"],          // disallow spacing between function identifiers and their invocations
        //   func-name-matching                           // require function names to match the name of the variable or property to which they are assigned
        //   func-names                                   // require or disallow named `function` expressions
        //   func-style                                   // enforce the consistent use of either `function` declarations or expressions
        //   id-blacklist                                 // disallow specified identifiers
        //   id-length                                    // enforce minimum and maximum identifier lengths
        //   id-match                                     // require identifiers to match a specified regular expression
        "indent": ["error", 4, {                          // enforce consistent indentation
            "ImportDeclaration": 1,
            "MemberExpression": 1,
            "SwitchCase": 1
        }],
        "jsx-quotes": ["error", "prefer-double"],         // enforce the consistent use of either double quotes in JSX attributes
        "key-spacing": ["error", {                        // enforce consistent spacing between keys and values in object literal properties
            "beforeColon": false,
            "afterColon": true
        }],
        "keyword-spacing": ["error", {                    // enforce consistent spacing before and after keywords
            "before": true,
            "after": true
        }],
        //   line-comment-position                        // enforce position of line comments
        "linebreak-style": ["error", "unix"],             // enforce consistent linebreak style
        //   lines-around-comment                         // require empty lines around comments
        //   max-depth                                    // enforce a maximum depth that blocks can be nested
        "max-len": ["error", {                            // enforce a maximum line length
            "code": 120,
            "ignoreStrings": true
        }],
        //   max-lines                                    // enforce a maximum number of lines per file
        //   max-nested-callbacks                         // enforce a maximum depth that callbacks can be nested
        //   max-params                                   // enforce a maximum number of parameters in function definitions
        //   max-statements                               // enforce a maximum number of statements allowed in function blocks
        //   max-statements-per-line                      // enforce a maximum number of statements allowed per line
        //   multiline-ternary                            // enforce newlines between operands of ternary expressions
        //   new-cap                                      // require constructor names to begin with a capital letter
        "new-parens": "error",                            // require parentheses when invoking a constructor with no arguments
        //   newline-per-chained-call                     // require a newline after each call in a method chain
        //   no-array-constructor                         // disallow `Array` constructors
        //   no-bitwise                                   // disallow bitwise operators
        //   no-continue                                  // disallow `continue` statements
        //   no-inline-comments                           // disallow inline comments after code
        //   no-lonely-if                                 // disallow `if` statements as the only statement in `else` blocks
        //   no-mixed-operators                           // disallow mixed binary operators
        // ✓ no-mixed-spaces-and-tabs                     // disallow mixed spaces and tabs for indentation
        //   no-multi-assign                              // disallow use of chained assignment expressions
        "no-multiple-empty-lines": ["error", {            // disallow multiple empty lines
            "max": 2,
            "maxEOF": 1
        }],
        //   no-negated-condition                         // disallow negated conditions
        "no-nested-ternary": "error",                     // disallow nested ternary expressions
        "no-new-object": "error",                         // disallow `Object` constructors
        //   no-plusplus                                  // disallow the unary operators `++` and `--`
        //   no-restricted-syntax                         // disallow specified syntax
        "no-tabs": "error",                               // disallow all tabs
        //   no-ternary                                   // disallow ternary operators
        "no-trailing-spaces": ["error", {                 // disallow trailing whitespace at the end of lines
            "ignoreComments": true,
            "skipBlankLines": true
        }],
        //   no-underscore-dangle                         // disallow dangling underscores in identifiers
        "no-unneeded-ternary": "error",                   // disallow ternary operators when simpler alternatives exist
        "no-whitespace-before-property": "error",         // disallow whitespace before properties
        //   nonblock-statement-body-position             // enforce the location of single-line statements
        //   object-curly-newline                         // enforce consistent line breaks inside braces
        "object-curly-spacing": ["error", "never"],       // enforce consistent spacing inside braces
        //   object-property-newline                      // enforce placing object properties on separate lines
        "one-var": ["error", "never"],                    // enforce variables to be declared either together or separately in functions
        "one-var-declaration-per-line": ["error", "initializations"],  // require newlines around variable declarations
        "operator-assignment": ["error", "always"],       // require assignment operator shorthand where possible
        "operator-linebreak": ["error", "before", {       // enforce consistent linebreak style for operators
            "overrides": {"||": "after", "&&": "after"}
        }],
        "padded-blocks": ["error", {                      // disallow padding within blocks
            "classes": "never",
            "switches": "never"
        }],
        //   padding-line-between-statements              // require or disallow padding lines between statements
        "quote-props": ["error", "as-needed"],            // require quotes around object literal property names
        "quotes": ["error", "single", {                   // enforce the consistent use of either backticks, double, or single quotes
            "allowTemplateLiterals": true
        }],
        //   require-jsdoc                                // require JSDoc comments
        "semi": ["error", "always"],                      // require or disallow semicolons instead of ASI
        "semi-spacing": ["error", {                       // enforce consistent spacing before and after semicolons
            "before": false,
            "after": true
        }],
        "semi-style": ["error", "last"],                  // enforce location of semicolons
        //   sort-keys                                    // require object keys to be sorted
        //   sort-vars                                    // require variables within the same declaration block to be sorted
        "space-before-blocks": ["error", "always"],       // enforce consistent spacing before blocks
        "space-before-function-paren": ["error", {        // enforce consistent spacing before `function` definition opening parenthesis
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "space-in-parens": ["error", "never"],            // enforce consistent spacing inside parentheses
        "space-infix-ops": "error",                       // require spacing around infix operators
        "space-unary-ops": ["error", {                    // enforce consistent spacing before or after unary operators
            "words": true,
            "nonwords": false
        }],
        "spaced-comment": ["error", "always"],            // enforce consistent spacing after the `//` or `/*` in a comment
        "switch-colon-spacing": ["error", {               // enforce spacing around colons of switch statements
            "before": false,
            "after": true
        }],
        "template-tag-spacing": ["error", "never"],       // disallow spacing between template tags and their literals
        "unicode-bom": ["error", "never"],                // require or disallow Unicode byte order mark (BOM)
        //   wrap-regex                                   // require parenthesis around regex literals

        // ECMAScript 6  (http://eslint.org/docs/rules/#ecmascript-6)
        //   arrow-body-style                             // require braces around arrow function bodies
        //   arrow-parens                                 // require parentheses around arrow function arguments
        "arrow-spacing": ["error", {                      // enforce consistent spacing before and after the arrow in arrow functions
            "before": true,
            "after": true
        }],
        // ✓ constructor-super                            // require `super()` calls in constructors
        "generator-star-spacing": ["error", {             // enforce consistent spacing around `*` operators in generator functions
            "before": true,
            "after": false
        }],
        // ✓ no-class-assign                              // disallow reassigning class members
        "no-confusing-arrow": "error",                    // disallow arrow functions where they could be confused with comparisons
        // ✓ no-const-assign                              // disallow reassigning `const` variables
        // ✓ no-dupe-class-members                        // disallow duplicate class members
        "no-duplicate-imports": ["error", {               // disallow duplicate module imports
            "includeExports": true
        }],
        // ✓ no-new-symbol                                // disallow `new` operators with the `Symbol` object
        //   no-restricted-imports                        // disallow specified modules when loaded by `import`
        // ✓ no-this-before-super                         // disallow `this`/`super` before calling `super()` in constructors
        "no-useless-computed-key": "error",               // disallow unnecessary computed property keys in object literals
        "no-useless-constructor": "error",                // disallow unnecessary constructors
        "no-useless-rename": "error",                     // disallow renaming import, export, and destructured assignments to the same name
        "no-var": "error",                                // require `let` or `const` instead of `var`
        "object-shorthand": ["error", "properties"],      // require or disallow method and property shorthand syntax for object literals
        "prefer-arrow-callback": "warn",                  // require arrow functions as callbacks
        "prefer-const": "error",                          // require `const` declarations for variables that are never reassigned after declared
        //   prefer-destructuring                         // require destructuring from arrays and/or objects
        //   prefer-numeric-literals                      // disallow `parseInt()` in favor of binary, octal, and hexadecimal literals
        "prefer-rest-params": "error",                    // require rest parameters instead of `arguments`
        "prefer-spread": "error",                         // require spread operators instead of `.apply()`
        "prefer-template": "warn",                        // require template literals instead of string concatenation
        // ✓ require-yield                                // require generator functions to contain `yield`
        "rest-spread-spacing": ["error", "never"],        // enforce spacing between rest and spread operators and their expressions
        //   sort-imports                                 // enforce sorted import declarations within modules
        "symbol-description": "error",                    // require symbol descriptions
        "template-curly-spacing": ["error", "never"],     // require or disallow spacing around embedded expressions of template strings
        "yield-star-spacing": ["error", "after"],         // require or disallow spacing around the `*` in `yield*` expressions

        // Jest  (https://www.npmjs.com/package/eslint-plugin-jest)
        // ✓ jest/no-disabled-tests                       // disallow disabled tests
        // ✓ jest/no-focused-tests                        // disallow focused tests
        // ✓ jest/no-identical-title                      // disallow identical titles
        // ✓ jest/valid-expect                            // ensure expect is called correctly

        // React  (https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)
        //   react/boolean-prop-naming                    // enforces consistent naming for boolean props
        //   react/default-props-match-prop-types         // prevent extraneous defaultProps on components
        // ✓ react/display-name                           // prevent missing `displayName` in a React component definition
        //   react/forbid-component-props                 // forbid certain props on Components
        //   react/forbid-elements                        // forbid certain elements
        //   react/forbid-prop-types                      // forbid certain propTypes
        //   react/forbid-foreign-prop-types              // forbid foreign propTypes
        //   react/no-array-index-key                     // prevent using Array index in `key` props
        // ✓ react/no-children-prop                       // prevent passing children as props
        //   react/no-danger                              // prevent usage of dangerous JSX properties
        // ✓ react/no-danger-with-children                // prevent problem with children and props.dangerouslySetInnerHTML
        // ✓ react/no-deprecated                          // prevent usage of deprecated methods
        //   react/no-did-mount-set-state                 // prevent usage of `setState` in `componentDidMount`
        //   react/no-did-update-set-state                // prevent usage of `setState` in `componentDidUpdate`
        // ✓ react/no-direct-mutation-state               // prevent direct mutation of `this.state`
        // ✓ react/no-find-dom-node                       // prevent usage of `findDOMNode`
        // ✓ react/no-is-mounted                          // prevent usage of `isMounted`
        "react/no-multi-comp": "error",                   // prevent multiple component definition per file
        //   react/no-redundant-should-component-update   // prevent usage of `shouldComponentUpdate` when extending React.PureComponent
        // ✓ react/no-render-return-value                 // prevent usage of the return value of `React.render`
        //   react/no-set-state                           // prevent usage of `setState`
        //   react/no-typos                               // prevent common casing typos
        // ✓ react/no-string-refs                         // prevent using string references in `ref` attribute.
        // ✓ react/no-unescaped-entities                  // prevent invalid characters from appearing in markup
        // ✓ react/no-unknown-property                    // prevent usage of unknown DOM property
        //   react/no-unused-prop-types                   // prevent definitions of unused prop types
        //   react/no-will-update-set-state               // prevent usage of `setState` in `componentWillUpdate`
        //   react/prefer-es6-class                       // enforce ES5 or ES6 class for React Components
        //   react/prefer-stateless-function              // enforce stateless React Components to be written as a pure function
        // ✓ react/prop-types                             // prevent missing props validation in a React component definition
        // ✓ react/react-in-jsx-scope                     // prevent missing `React` when using JSX
        //   react/require-default-props                  // enforce a defaultProps definition for every prop that is not a required prop
        //   react/require-optimization                   // enforce React components to have a `shouldComponentUpdate` method
        // ✓ react/require-render-return                  // enforce ES5 or ES6 class for returning value in render function
        "react/self-closing-comp": "error",               // prevent extra closing tags for components without children
        //   react/sort-comp                              // enforce component methods order
        //   react/sort-prop-types                        // enforce propTypes declarations alphabetical sorting
        //   react/style-prop-object                      // enforce style prop value being an object
        //   react/void-dom-elements-no-children          // prevent void DOM elements (e.g. `<img />`, `<br />`) from receiving children

        // JSX  (https://github.com/yannickcr/eslint-plugin-react#jsx-specific-rules)
        //   react/jsx-boolean-value                      // enforce boolean attributes notation in JSX
        //   react/jsx-closing-bracket-location           // validate closing bracket location in JSX
        //   react/jsx-closing-tag-location               // validate closing tag location in JSX
        //   react/jsx-curly-spacing                      // enforce or disallow spaces inside of curly braces in JSX attributes and expressions
        //   react/jsx-equals-spacing                     // enforce or disallow spaces around equal signs in JSX attributes
        //   react/jsx-filename-extension                 // restrict file extensions that may contain JSX
        //   react/jsx-first-prop-new-line                // enforce position of the first prop in JSX
        //   react/jsx-handler-names                      // enforce event handler naming conventions in JSX
        //   react/jsx-indent                             // validate JSX indentation
        //   react/jsx-indent-props                       // validate props indentation in JSX
        // ✓ react/jsx-key                                // validate JSX has key prop when in array or iterator
        "react/jsx-max-props-per-line": ["error", {       // limit maximum of props on a single line in JSX
            "maximum": 1,
            "when": "multiline"
        }],
        "react/jsx-no-bind": ["error", {                  // prevent usage of `.bind()` and arrow functions in JSX props
            "allowArrowFunctions": true,
            "ignoreRefs": true
        }],
        // ✓ react/jsx-no-comment-textnodes               // prevent comments from being inserted as text nodes
        // ✓ react/jsx-no-duplicate-props                 // prevent duplicate props in JSX
        //   react/jsx-no-literals                        // prevent usage of unwrapped JSX strings
        // ✓ react/jsx-no-target-blank                    // prevent usage of unsafe `target='_blank'`
        // ✓ react/jsx-no-undef                           // disallow undeclared variables in JSX
        //   react/jsx-curly-brace-presence               // enforce curly braces or disallow unnecessary curly braces in JSX
        //   react/jsx-pascal-case                        // enforce PascalCase for user-defined JSX components
        //   react/jsx-sort-props                         // enforce props alphabetical sorting
        //   react/jsx-space-before-closing               // validate spacing before closing bracket in JSX
        //   react/jsx-tag-spacing                        // validate whitespace in and around the JSX opening and closing brackets
        // ✓ react/jsx-uses-react                         // prevent React to be incorrectly marked as unused
        // ✓ react/jsx-uses-vars                          // prevent variables used in JSX to be incorrectly marked as unused
        //   react/jsx-wrap-multilines                    // prevent missing parentheses around multilines JSX
    },
    "root": true
};
