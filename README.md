# PbtA Template
A code template for creating modules for Foundry VTT that uses the PbtA System package.

## Usage
There are two ways to get started: using the PbtA Template module generator command or manually renaming and updating files.

Regardless of which method you choose, think carefully about your modules's name. Your modules's package name when submitted to Foundry must be formatted like `alphanumeric-lowercase`, and it must be unique. Check the Foundry systems package list for conflicts before committing to a name!

### Generator

This module includes a generator CLI in `package.json`. To use it, you must have [node.js](https://nodejs.org) installed, and it's recommended that you install node 20 or later.
Once you have npm installed, you can run the following in your terminal or command prompt:

```bash
npm install
npm run generate
```

Your terminal should prompt you to name your module. Read the instructions carefully, the letter case and special characters in each question matter for correct module generation.

Once the generator completes, it will output your module to `build/<your-module-name>`, where `<your-module-name>` is the package name you supplied during the prompt.

Copy this directory over to your Foundry modules directory and start coding!

### Manual Replacement

Before installing this module, you should rename any files that have `pbta-template` in their filename to use whatever machine-safe name your module needs, such as `masks` if you were building a module for Masks: The New Generation. In addition, you should search through the files for `pbta-template`, `PBTA_TEMPLATE` and `PbtA Template` and do the same for those, replacing them with appropriate names for your module.

The `name` property in your `module.json` file is your modules's package name. This needs to be formatted `alphanumeric-lowercase`, and it must also match the foldername you use for your module.

### Other things to update

No Matter which way you things renamed there are some other manual things you will need to handle
- This template has github base Repo links, which will need to be updated to your repo url. (example: image urls in the module.json)
- LICENSE & package.json files will need "Joseph Hopson" replaced with your name/username

### Next Steps
See the CONTRIBUTING.md for more information.
 - Perform an `npm install`. 
 - Use `npm run watch` to get the scss watcher up and running. 
 - Use the scripts in the tools folder for managing packs (see: https://foundryvtt.wiki/en/development/api/CompendiumCollection). 
 - Releases are done using github's release process (the workflow should do everything else for you, as long as it's file list is correct for what should get put into the module.zip).
   1. Create a new release
   2. Tag it with the release version
   3. Once you click "go" all artifacts should be created, including the module.zip and module.json
 - Images will need to be updated, there are affinity photo files in the raw-assets folder.
 - replace instances of my info with your own (in module.json authors, license file, package.json)
 - [PbtA System documentation](https://github.com/asacolips-projects/pbta/wiki) 
 - [Older PbtA Docs](https://asacolips.gitbook.io/pbta-system)
 - [Foundry Community Wiki](https://foundryvtt.wiki/en/development)

## Everything below this line is an example readme file:
<hr>

![Cover](assets/cover.webp)

# PbtA Template Module (Unofficial)
This module is for [Foundry VTT](https://foundryvtt.com/) and requires the [PbtA System](https://github.com/asacolips-projects/pbta) created by [asacolips](https://github.com/asacolips).

<p align="center">
    <img alt="Foundry Version 12 support" src="https://img.shields.io/badge/Foundry-v12-informational">
    <img alt="Foundry Version 13 support" src="https://img.shields.io/badge/Foundry-v13-informational">
    <img alt="Latest Release Download Count" src="https://img.shields.io/github/downloads/philote/pbta-template/latest/total"> 
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/philote/pbta-template"> 
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/philote/pbta-template">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/philote/pbta-template">
</p>
<p align="center">
    <img alt="GitHub" src="https://img.shields.io/github/license/philote/pbta-template"> 
    <a href="https://github.com/philote/pbta-template/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/philote/pbta-template">
    </a> 
    <a href="https://github.com/philote/pbta-template/network">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/philote/pbta-template">
    </a> 
    <a href="https://github.com/philote/pbta-template/stargazers">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/philote/pbta-template">
    </a>
</p>

### A PbtA Template module for Foundry VTT using the PbtA System
[Description of the game with links to the publisher goes here.]
This module is for [Foundry VTT](https://foundryvtt.com/) and requires the [PbtA System](https://github.com/asacolips-projects/pbta) created by [asacolips](https://github.com/asacolips).

## Screenshot
![Screenshot](assets/screenshot.webp)

## Dependencies
The following Foundry VTT game system must be installed to use this module: [Powered by the Apocalypse](https://foundryvtt.com/packages/pbta).

## How to Install
You can install the latest released version of the module by using this manifest link in Foundry VTT. [Instructions](https://foundryvtt.com/article/tutorial/): https://github.com/philote/pbta-template/releases/latest/download/system.json

## Features
- Feature One
- Feature Two

## TODO
- TODO One

# License & Acknowledgements
Icons from game-icons.net are released under a Creative Commons Attribution 3.0 Unported license. https://creativecommons.org/licenses/by/3.0/
