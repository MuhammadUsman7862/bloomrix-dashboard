# Bloomrix Dashboard (SCSS)

## SCSS folder structure
```
scss/
  main.scss              <- the only file you compile (it @use's all partials)
  abstracts/             <- no CSS output, only tools
    _variables.scss        maps: colours, spacing, breakpoints, statuses
    _functions.scss        rem() function
    _mixins.scss           respond(), focus-ring, surface
    _index.scss            @forward's the three files above
  base/
    _root.scss             maps -> CSS custom properties (design system)
    _reset.scss            reset, focus-visible, prefers-reduced-motion
  layout/
    _shell.scss            grid shell, sidebar, overlay, top bar, page layout
  components/              one file per BEM block
    _button  _badge  _stat  _field  _table  _modal
```
## Install + compile
``
npm install -g sass
sass scss/main.scss css/main.css            (compile once)
sass --watch scss/main.scss css/main.css    (re-compile on every save)
```
