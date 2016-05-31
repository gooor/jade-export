# jade-export

Meteor package for compiling *.jade files.

Compile Jade templates for use in Meteor Angular 1.x, Angular 2.x or anything else.

## Installation

`meteor add gooor:jade-export`

## Usage

Files ending in `*.ng.jade` or `*.jade` will be compiled to minified `html` string variable accessible via `ES6 modules`.

### Example:

file under `imports/ui/modules/foo/bar.jade` will be compiled and can be used with:
```
import template from '**relative_path**/imports/ui/modules/foo/bar.html';

\\ Angular 2
@Component({
  ...
  template: template
  ...
})

\\ Angular 1.x
app.directive('someName', function() {
  return {
    template,
    link() {
     ...
  };
});

```
