# Brackets Elixir

This plugin provides syntax highlighting and tooling for
[Elixir](http://elixir-lang.org).  

## Features

### Syntax highlighting

The syntax highlighting is currently nothing more than glue between
[halohalospecial](https://github.com/halohalospecial)'s
[codemirror-elixir-mode](https://github.com/halohalospecial/codemirror-elixir-mode)
and [BigBlueHat](https://github.com/BigBlueHat)'s
[brackets-langman](https://github.com/BigBlueHat/brackets-langman).  
Therefore the highlighting and identendation are still improvable.

### Elixir Mix Task support

The plugin provides support for Elixirs build tool `mix`.
For this features it is required that the opened project is an Elixir mix
project. This means a `mix.exs` file is expected in the projects root directory.

- `mix compile` and `mix test` can be invoked from within brackets.
- The results will be shown on a dedicated panel and links to jump directly to
  errors are included in the output.  
- The plugin can also be configured to autorun one of these commands if a file
  in the project is saved.  
  The functionality can be activated and deactivated through the
  `brackets-elixir.onSaveRunMixCompile` and `brackets-elixir.onSaveRunMixTest`
  options.

### Elixir REPL integration

The plugin provides an `iex` REPL to the user on a dedicated panel for the use
in mix projects.  

- The REPL must be manually start and stopped trough a button on the REPL
  widget. For the first start of the REPL it is necessary that the mix project
  compiles without errors.
- The REPL will be started with the `iex -S mix` command.
- The REPL includes a command history functionality.
- Selected text in an editor can be send to the REPL through a command, which is
  visible in the menu and context menu and can also be bound to a key.
- Alternatively the whole content of an editor can be sent to the REPL.
- The plugin can be configured to automatically send a recompile command to the
  REPL if the user saves any elixir source file in the projects `lib` folder.
  If the function is activated through the `brackets-elixir.onSaveCompileInRepl`
  option.

### Autocompletion functionality

The plugin provides autocompletion for Elixir modules and functions. This is
achieved through a hidden REPL (further referenced as the system REPL) which is
opened automatically for an Elixir project. This REPL gets queried for
completions. Therefore the autocomplete functionality is only available in mix
projects.

### Show documentation functionality

The plugin allows to show the documentation for Elixir modules and functions
inline with the source code. The system REPL is used to query for the
documentation, therefore this feature is also only available in mix projects.  
The documentation views can be closed with the escape key (like all brackets
inline widgets).


## Supported commands

The following commands are provided and can be bound to keys:

- `brackets-elixir.toggle-mix-output-window`  
  Show/Hide mix output window

- `brackets-elixir.toggle-repl-window`  
  Show/Hide REPL window

- `brackets-elixir.mix-compile`  
  Runs `mix compile` for the current project

- `brackets-elixir.mix-test`  
  Runs `mix test` for the current project

- `brackets-elixir.restart-system-repl`  
  Restarts the internal REPL which is used for autocompletion and help
  functionality

- `brackets-elixir.send-selected-text-to-repl`  
  Send selected text to REPL

- `brackets-elixir.send-current-file-to-repl`  
  Sends the whole content of the active editor to the REPL

- `brackets-elixir.show-doc-for-identifer`  
  Show documentation for the identifier under the active cursor. Can be hidden
  with escape key.


## Known Issues

- The REPLs for the plugin are started as node.js child_processes. Unfortunatly
  there are issues with killing these child processes completely. Therefore it
  may happen happen that erlang processes stick around even after closing
  brackets.
- The codemirror mode for Elixir should be further improved to provide a more
  reliable behavior, especially regarding indentation.

## Contributing

Want Brackets-Elixir improved? Me too! Feel free to open an issue or PR here on
github.

## License

[MIT](http://opensource.org/licenses/mit)

Glued together by Matt Enlow ([@novaugust](http://github.com/novaugust) on most
parts of the internet).  
Heavily updated by Matthias Einwag ([@Matthias247](http://github.com/Matthias247))
to support direct interaction with the Elixir tooling, including a REPL,
autocompletion and inline help functionality as well as recompile-on-save hooks.
