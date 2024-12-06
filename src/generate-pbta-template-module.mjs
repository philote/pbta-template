import inquirer from "inquirer";
import replace from "replace";
import { glob } from "glob";
import fs from "fs";
import path from "path";

/**
 * PbtA Module generator class.
 * 
 * TODO : github repo replacement /philote/pbta-template/
 *
 * This file is a modified version of Asacolip's Boilerplate Generator
 * https://github.com/asacolips-projects/boilerplate/blob/9d9e02ad42b19747b34a5a3c7cd81816511c748d/src/generate-boilerplate-system.mjs
 *
 * This class has several helper methods used to process files
 * for the `npm run generate` command. This is later called in
 * inquirer.promp().then() once user's terminal prompt answers
 * have been returned.
 */
class SystemGenerator {
  constructor(answers) {
    // Initialize our props.
    this.packageName = answers.packageName.trim(); // Example: pbta-template
    this.titleName = answers.titleName.trim(); // Example: PbtA Template
    this.constantName = answers.constantName.trim(); // Example: PBTA_TEMPLATE
    // Transform answers.
    this.packageName = this.transformPackageName();
    this.constantName = this.transformConstantName();
    // If the package name had non-alphanumeric character, create a version
    // that can safely be used in object props.
    this.propName = this.packageName.replaceAll("-", "");
  }

  /**
   * Transform package name.
   *
   * @returns string
   *   Package name string, such as 'my-module'
   */
  transformPackageName() {
    const packageName = this.packageName ?? "";
    return packageName.toLowerCase().replaceAll(/[^a-z\d]/g, "-");
  }

  /**
   * Transform constant name.
   *
   * @returns string
   *   Constant name string, such as 'MY_MODULE'
   */
  transformConstantName() {
    const constantName = this.constantName ?? this.packageName;
    return constantName.toUpperCase().replaceAll(/[^A-Z\d]/g, "_");
  }

  /**
   * Clean build directory.
   *
   * Delete the build directory so that we have a fresh start.
   */
  cleanBuildDir() {
    fs.rmSync(`build`, { recursive: true, force: true });
  }

  /**
   * Copy files to build directory.
   *
   * @param {Array} files Array of file paths.
   */
  copyFiles(files) {
    files.forEach((source) => {
      fs.cpSync(
        source,
        `build/${this.packageName}/${source}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
    });
  }

  /**
   * Replace file contents.
   *
   * Replace references to 'pbta-template', 'PbtA Template', and 'PBTA_TEMPLATE'
   * in files copied over to the build directory.
   */
  replaceFileContents() {
    // Set patterns to iterate over later.
    const replacements = [
      {
        pattern: "pbta-template",
        replacement: this.packageName,
      },
      {
        pattern: "PBTA_TEMPLATE",
        replacement: this.constantName,
      },
    ];

    // Update title in module.json.
    replace({
      regex: "PbtA Template",
      replacement: this.titleName,
      paths: [`./build/${this.packageName}/module.json`],
      silent: true,
    });

    // Initialize our replacement options.
    const replaceOptions = {
      paths: [`./build/${this.packageName}/`],
      recursive: true,
      silent: true,
    };

    // Update text based on the replacements array.
    replacements.forEach((replacePair) => {
      replace({
        regex: replacePair.pattern,
        replacement: replacePair.replacement,
        ...replaceOptions,
      });
    });
  }

  /**
   * Rename files.
   *
   * Rename files that had boilerplate in their name, such as
   * css/boilerplate.css.
   */
  renameFiles() {
    glob(`build/${this.packageName}/**/*pbta-template*.*`).then((files) => {
      files.forEach((oldPath) => {
        const file = path.basename(oldPath);
        const directory = path.dirname(oldPath);
        fs.rename(
          oldPath,
          `${directory}/${file.replaceAll("pbta-template", this.packageName)}`,
          (err) => {
            if (err) throw err;
          }
        );
      });
    });
  }

  /**
   * Clean up package.json and build scripts.
   *
   * Removes this script and package-lock.json from the build directory.
   * Removes scripts and devDependencies related to this script from
   * package.json.
   *
   */
  cleanPackageJson() {
    // Remove unneeded files.
    fs.rmSync(
      `build/${this.packageName}/src/generate-pbta-template-module.mjs`
    );
    fs.rmSync(`build/${this.packageName}/package-lock.json`);

    // Load package.json so that we can remove dev dependencies.
    const pkgSrc = fs.readFileSync(
      `build/${this.packageName}/package.json`,
      "utf8"
    );
    const pkgJson = JSON.parse(pkgSrc);
    // Delete the dependencies used by this script.
    delete pkgJson.scripts.generate;
    delete pkgJson.devDependencies.glob;
    delete pkgJson.devDependencies.prompt;
    delete pkgJson.devDependencies.renamer;
    delete pkgJson.devDependencies.replace;
    delete pkgJson.devDependencies.inquirer;
    // Write the new package.json
    fs.writeFileSync(
      `build/${this.packageName}/package.json`,
      JSON.stringify(pkgJson, null, "  "),
      "utf8"
    );
  }
}

/**
 * Execute inquirer prompt for user input.
 */
inquirer
  // Initialize prompts.
  .prompt([
    {
      type: "input",
      name: "packageName",
      message:
        'Enter the package name of your module, such as "my-module" (alphanumeric characters and hyphens only):',
      default: "my-module",
    },
    {
      type: "input",
      name: "titleName",
      message: 'Enter the formatted name of your module, such as "My Module":',
      default: "My Module",
    },
    {
      type: "input",
      name: "constantName",
      message:
        'Enter the name of your module for usage in constants, such as "MY_MODULE" (alphanumeric characters and underscores only):',
      default: "MY_MODULE",
    },
  ])
  // Handle answers.
  .then((answers) => {
    // Validate for empty values.
    for (let [question, answer] of Object.entries(answers)) {
      if (!answer || !answer.length || answer.trim().length < 1) {
        throw new Error(`${question} cannot be empty.`);
      }
    }

    // Initialize our generator class.
    const generator = new SystemGenerator(answers);

    // Clean out our build directory.
    generator.cleanBuildDir();

    // Glob Boilerplate's files so that we can process them.
    glob("*", { ignore: ["node_modules/**"] }).then((files) => {
      // Copy all files into the build dir.
      generator.copyFiles(files);
      // Replace boilerplate name mentions in files.
      generator.replaceFileContents();
      // Rename files that had boilerplate in their name.
      generator.renameFiles();
      // Remove generator files and update package.json.
      generator.cleanPackageJson();
    });

    // Output a success message.
    console.log(
      `Success! Your module has been written to the ${generator.packageName}/ directory.`
    );
  })
  // Handle errors.
  .catch((error) => {
    console.error(error);
  });
