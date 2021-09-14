## Overview
This Vue.js single-page application is a mock key-performance-indicators (KPI) monitoring page.
Developed as Nosto's frontend programming challenge.

## Quick-start

* `git clone`
* ```
  cd nosto-assignment
  npm install && npm run serve
  ```
* Browse to `localhost:8080` to start.

## Technical Information

Technologies:
Vue 2, bootstraped with Vue CLI, utilizing Nosto Design System.
JS + SCSS

Dev environment: VSCode, Node v14

## Design Philosophy

Although the page is small in scope, all components were developed with scalability, modularity and integration in mind.

`components/*` contains the building blocks of the page

`api.js` simulates fetching data from an API endpoint.

`hooks/*` contains implementations of Vue's Composition API to provide data wherever needed.

`data/kpiPanelsLayout.json` allows customizing the layout of the Panels and KPI cards, as long as the data is available for it.
This layout info can also be fetched from API if wanted.

The mock of the design can be found here:
https://www.figma.com/file/y2g8v5LBVjwIDyiPvZtZ6k/Front-end-developer-assignment?node-id=1%3A2

The page is designed as strictly as possible with Nosto Design System components and design tokens.
Custom components are prioritized to manage their own styles, unless it makes sense in the layout perspective to let parent components do the stylings.

Some sidesteps from the mock design are intentional with reasonings below:
- "Items sold" and "Conversion rate" cards are switched places: It makes more sense to show "Items sold" alongside other information about sold items.
- The arrows in the change indicator will always show the direction of change (up for increase, down for decrease);
while the text color will express the sentiment of the changes (Is higher value better?).
This is different from the mock where down arrows are always red, even if the value increase.

Responsiveness was not the main focus, but components and page layout should respond nicely to common small to large screen sizes.

## Caveats

- Certain parts of the Nosto Design System's components have to be reimplemented to reflect the mock design better (KpiCard, Panel,...)
- The ChartPanel component stands to be refactored into more reusable components, but that would require extra specifications on customizabilities,.. so several values are semi hard-coded for this usecase (showing March/Feb visits).
- The provided Nosto's Design System package didn't work out of the box and required a small change + rebuild, details here:
https://github.com/Av0c/nosto-design-system-hotfix.git
- Certain numbers in the mock design seems to be inaccurate, this initially confused the developer about the meanings of some of the indicators.