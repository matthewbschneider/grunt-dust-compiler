# grunt-dust-compiler v0.1.6

[![NPM](https://nodei.co/npm/grunt-dust-compiler.png?downloads=true)](https://www.npmjs.org/package/grunt-dust-compiler)

> A grunt task for compiling dust templates.

## Prerequisites

In order to compile dust templates dustjs-linkedin must be installed globally to use the `dustc` command:

```shell
npm install -g dustjs-linkedin
```

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dust-compiler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dust-compiler');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4)*



## Dustc task
_Run this task with the `grunt dustc` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### registerFileName
Type: `Boolean` 
Default: `false`

By default dust templates are compiled and registered with its relative path. If `registerFileName` is set to `true`, then the compiled template(s) will be registered with only its filename. 

### Usage Examples

```js
dustc: {
  main: {
    files: [
      // includes files within path
      {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

      // includes files within path and its sub-directories
      {expand: true, src: ['path/**'], dest: 'dest/'},

      // makes all src relative to cwd
      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

      // register dust templates individually with register property
      {src: ['path/file.dust'], dest: 'dest/file.js', register: 'foo'},
    ]
  }
}
```

This task supports all the file mapping format Grunt supports. Please read [Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns) and [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for additional details.

Here are some additional examples, given the following file tree:
```shell
$ tree -I node_modules
.
├── Gruntfile.js
└── src
    ├── a
    └── subdir
        └── b

2 directories, 3 files
```

**Compile a single file tree:**
```js
dustc: {
  main: {
    src: 'src/*',
    dest: 'dest/',
  },
},
```

```shell
$ grunt dustc
Running "dustc:main" (dustc) task
Created 1 directories, copied 1 files

Done, without errors.
$ tree -I node_modules
.
├── Gruntfile.js
├── dest
│   └── src
│       ├── a
│       └── subdir
└── src
    ├── a
    └── subdir
        └── b

5 directories, 4 files
```

**Flattening the filepath output:**

```js
dustc: {
  main: {
    expand: true,
    cwd: 'src/',
    src: '**',
    dest: 'dest/',
    flatten: true,
    filter: 'isFile',
  },
},
```

```shell
$ grunt dustc
Running "dustc:main" (dustc) task
Copied 2 files

Done, without errors.
$ tree -I node_modules
.
├── Gruntfile.js
├── dest
│   ├── a
│   └── b
└── src
    ├── a
    └── subdir
        └── b

3 directories, 5 files
```

##### Troubleshooting

By default, if a file or directory is not found it is quietly ignored. If the file should exist, and non-existence generate an error, then add `nonull:true`. For instance, this Gruntfile.js entry:

```js
dustc: {
  main: {
    nonull: true,
    src: 'not-there',
    dest: 'create-me',
  },
},
```

gives this output:

```shell
$ grunt dustc
Running "dustc:main" (dustc) task
Warning: Unable to read "not-there" file (Error code: ENOENT). Use --force to continue.

Aborted due to warnings.
```

---

Task submitted by Matthew Schneider
