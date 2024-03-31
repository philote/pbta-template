# pbta-template
A code template for creating modules for Foundry VTT that uses the PbtA System package

> [!NOTE]
> Using this template: 
> - You will need to replace all instances of pbta-template with your module name, usually the id used in module.json. 
> - Repo links will need to be updated to your repo. (example: image urls in the module.json)
> - Perform an `npm install`. 
> - Use `npm run gulp` to get the scss working. 
> - Use the scripts in the tools folder for managing packs (see: https://foundryvtt.wiki/en/development/api/CompendiumCollection). 
> - Releases are done using github's release process (the workflow should do everything else for you, as long as it's file list is correct for what should get put into the module.zip).
>   1. Create a new release
>   2. Tag it with the release version
>   3. Once you click "go" all artifacts should be created, including the module.zip and module.json
> - Images will need to be updated, there are affinity photo files in the raw-assets folder.
> - replace instances of my info with your own (in module.json authors, license file, package.json)
> - PbtA System documentation: https://asacolips.gitbook.io/pbta-system

![Cover](assets/cover.webp)

# A [game name] module for Foundry VTT using the PbtA System
This module is for [Foundry VTT](https://foundryvtt.com/) and requires the [PbtA System](https://github.com/asacolips-projects/pbta) created by [asacolips](https://github.com/asacolips).

![](https://img.shields.io/badge/Foundry-v11-informational)
<!--- Downloads @ Latest Badge -->
![Latest Release Download Count](https://img.shields.io/github/downloads/philote/pbta-template/latest/module.zip)
<!--- Forge Bazaar Install % Badge -->
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%pbta-template&colorB=4aa94a)

[Description of the game with links to the publisher goes here.]

![Screenshot](assets/screenshot.webp)

## Dependencies

The following Foundry VTT game system must be installed to use this module: [Powered by the Apocalypse](https://foundryvtt.com/packages/pbta).

## Features

- Feature One
- Feature Two

## TODO
- TODO One

# License & Acknowledgements

Icons from game-icons.net are released under a Creative Commons Attribution 3.0 Unported license. https://creativecommons.org/licenses/by/3.0/
