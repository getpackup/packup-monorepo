

# Packup 🎒🥾🏔

This project was generated using [Nx](https://nx.dev).

A mono-repository generated using [Nx](https://nx.dev) for the purpose of building and developing awesome Packup project. This includes
building marketing website with Gatsby, progressive web application with NextJS and possibly iOS and Android apps with React Native 
whilst all of them common components and libraries from the same repository. 

## Quickstart 🚀

1. Clone repository and install dependencies
```shell
gh repo clone getpackup/getpackup-group
cd getpackup-group
npm
```
2. Get environment set up for development by creating `.env` in relevant projects
3. Start dev server with `nx serve <project name>` e.g. `nx serve pwa`
4. Setup Firebase Emulator Suite You can find additional documentation on exporting production data and setting up Firebase Emulator 
Suite in [firebaseEmulatorSuite.md](https://github.com/tonymamo/getpackup/blob/master/docs/firebaseEmulatorSuite.md) which will be
migrated to this project later on

## Working with NX - tool for monorepo management and development

NX is a comprehensive tool for effectively managing mono-repository. It is highly recommended to send some time to familiarise yourself 
with its structure, philosophy and commands. Or skip it all and scroll to the cheatsheet. 

### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

There are many [community plugins](https://nx.dev/community) you could add.

### Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@getpackup-group/mylib`.

### Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

### Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

