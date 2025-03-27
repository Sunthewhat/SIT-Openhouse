## Cloning the repository
To clone the repository, run the following command:
```bash
git clone https://csgit.sit.kmutt.ac.th/openhouseteam/sitopenhouse-frontend.git
```

## Install bun
This project requires bun as a runtime dependency. To install bun, run the following command:
```bash
npm install -g bun
```

## Install the dependencies
To install the dependencies, run the following command:
```bash
bun install
```

## Start the development
To start the development, run the following command:
```bash
bun dev
```

## nextjs paths
in nextjs path will be read from the `pages` directory. The path will be the file name without the `.tsx` extension. For example, the file `app/ict-challenge/register/PDPA/page.tsx` will be the path `/ict-challenge/register/PDPA`.

## tailwindcss
This project use tailwindcss as the css framework.

https://tailwindcss.com/docs/installation


## Git branching
This project use the following git branching model:
- `main`: The main branch. This branch is protected and can only be updated via pull request.
- `[${feature-name}]-${subfeature-name}-${number}`: The feature branch. This branch is created from the `main` branch and will be merged back to the `main` branch via pull request. The feature branch should be deleted after it is merged to the `main` branch. example: `[ICT]-PDPA_page-1` as ICT feature with PDPA_page subfeature and 1 as the times that this subfeature is visited.