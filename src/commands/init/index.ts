import { Command, Flags } from '@oclif/core';
import inquirer from 'inquirer';
import { execa } from 'execa';
import * as fs from 'fs';
import * as path from 'path';

export default class Init extends Command {
  static description = 'Initialize a serverless MCP project with your preferred framework'

  static flags = {
    dir: Flags.string({
      char: 'd',
      description: 'Target directory name',
    }),
    silent: Flags.boolean({
      char: 's',
      description: 'Suppress welcome message',
      default: false,
    }),
  }

  async run() {
    const { flags } = await this.parse(Init)

    if (!flags.silent) {
      this.log(`
        👋 Hey there! Welcome to the Serverless MCP Boilerplate CLI.
        
        This tool helps you kickstart your serverless MCP server by letting you choose your preferred deployment framework for AWS.
        
        You can pick from:
        - Serverless Framework
        - AWS SAM
        - AWS CDK
        
        Just select your weapon of choice, and we’ll clone the corresponding boilerplate repo locally for you.
      `)
    }

    try {
      const { framework } = await inquirer.prompt([
        {
          type: 'list',
          name: 'framework',
          message: 'Choose your deployment framework:',
          choices: ['Serverless Framework', 'AWS SAM', 'AWS CDK'],
        },
      ])

      // Define the repository URLs
      const repoMap: Record<string, string> = {
        'Serverless Framework': 'https://github.com/eleva/serverless-mcp-server',
        'AWS SAM': 'https://github.com/eleva/sam-serverless-mcp-server',
        'AWS CDK': 'https://github.com/eleva/cdk-serverless-mcp-server',
      }

      const repoUrl = repoMap[framework]

      // Extract the repo name from the URL to use as the default directory name
      const repoName = repoUrl.split('/').pop()?.replace('.git', '') || 'default-repo'
      const targetDir = flags.dir || repoName
      const fullPath = path.resolve(process.cwd(), targetDir)

      // Check if the directory already exists
      if (fs.existsSync(fullPath)) {
        this.error(`❌ Directory "${targetDir}" already exists. Please choose a different name with --dir`)
        return
      }

      // Clone the selected repo
      this.log(`\n📦 Cloning ${framework} boilerplate into ./${targetDir}...\n`)
      await execa('git', ['clone', repoUrl, targetDir], { stdio: 'inherit' })

      // Install dependencies
      this.log(`\n📦 Installing dependencies in ./${targetDir}...\n`)
      await execa('npm', ['install'], { cwd: fullPath, stdio: 'inherit' })

      this.log(`\n✅ Setup complete! Navigate to ./${targetDir} and check the README.md to get started.\n`)
    } catch (err: any) {
      if (err.shortMessage && err.shortMessage.includes('git')) {
        this.error('❌ Git is not installed or not available in your PATH.')
      } else if (err.shortMessage && err.shortMessage.includes('npm')) {
        this.error('❌ npm install failed. Make sure Node.js and npm are properly installed.')
      } else {
        this.error(`❌ An error occurred: ${err.message || err}`)
      }
    }
  }
}
