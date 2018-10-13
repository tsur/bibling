import { getOptions, areOptionsValid, shouldDisplayHelp, printHelp, cli } from 'cli/utils';

// Run it!
(function runCLI() {
    const options = getOptions();

    if (!areOptionsValid(options)) {
        return printHelp();
    }

    if (shouldDisplayHelp(options)) {
        return printHelp();
    }

    return cli(options);
}());
