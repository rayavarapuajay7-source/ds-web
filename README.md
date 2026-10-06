# Kestrel KV

A responsive, multi-page product website for a high-performance in-memory key-value store concept. Built with plain HTML, CSS, and JavaScript; no build step or package installation is required.

## Pages

- `index.html` — product overview and performance highlights
- `architecture.html` — request lifecycle, concurrency, and memory layout
- `benchmarks.html` — interactive workload profiles and reference conditions
- `docs.html` — quickstart, client examples, commands, and operations notes

## Project Structure

```text
.
├── index.html
├── architecture.html
├── benchmarks.html
├── docs.html
├── README.md
└── assets/
    ├── css/
    │   └── site.css
    └── js/
        └── site.js
```

## Run Locally

From the project directory, start Python's built-in web server:

```powershell
python -m http.server 4173
```

Then open [http://localhost:4173/](http://localhost:4173/) in your browser. Stop the server with `Ctrl+C`.

## Interactive Features

- Responsive navigation menu for smaller screens
- Benchmark workload selector that updates the displayed reference figures and chart
- Node.js and Python client example tabs
- Copy buttons for commands and code examples

> **Note:** Performance figures are illustrative reference values, not measured or guaranteed results. Kestrel KV content in this site is a product concept; the pages do not implement a running key-value server.
