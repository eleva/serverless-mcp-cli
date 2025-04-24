serverless-mcp-cli
=================
Initialize a serverless MCP project on AWS with your preferred framework

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```bash
$ npm install -g serverless-mcp-cli

$ serverless-mcp-cli init
running command...

$ serverless-mcp-cli (--version)
serverless-mcp-cli/0.0.0 darwin-arm64 node-v22.13.1

$ serverless-mcp-cli --help [COMMAND]
USAGE
  $ serverless-mcp-cli COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`serverless-mcp-cli init`](#serverless-mcp-cli-init-command)
* [`serverless-mcp-cli help [COMMAND]`](#serverless-mcp-cli-help-command)

## `serverless-mcp-cli init`

Initialize a serverless MCP project on AWS with your preferred framework

```bash
USAGE
  $ serverless-mcp-cli init -d <directory> -s

ARGUMENTS

FLAGS
  -d=<value>  (optional) Directory in which create the project. If not specified, the name of the github repo will be used.
  -s  (optional) Silent mode. Suppress welcome message.
  
DESCRIPTION
    Initialize a serverless MCP project on AWS with your preferred framework-

EXAMPLES
  $ serverless-mcp-cli init -d ./serverless-mcp-server
```

_See code: [src/commands/init/index.ts](https://github.com/eleva/https:/blob/v0.0.0/src/commands/hello/init.ts)_

## `serverless-mcp-cli help [COMMAND]`

Display help for serverless-mcp-cli.

```bash
USAGE
  $ serverless-mcp-cli help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for serverless-mcp-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.27/src/commands/help.ts)_