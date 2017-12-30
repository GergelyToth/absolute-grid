# Absolute Grid

Absolute Grid is a grid system what positions all grid elements absolutely to
enable transitioning any of its elements without shifting or moving the layout.

Written in ES6.

## Usage

Invoke absolute grid in your JS file.

    AbsoluteGrid(options);

## Options:

| Name              | Default value |
|-------------------|---------------|
| containerSelector |    .container |
| childrenSelector  |     .children |
| width             |           190 |
| height            |           250 |
| marginX           |            10 |
| marginY           |            15 |
| enableHover       |         false |
| enableClick       |         false |

> Note: You will need to add all the styling for the '.hover', '.active' children, plus for the '.overlay' element as well.
> Check out the example-click.html file for guidance.
