module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/prettier'
  ],
  "rules":{
    "import/no-unassigned-import": 0,
    "no-console":'off',
    // "space-before-function-paren": [
    //   "error",
    //   {
    //     "anonymous": "always",
    //     "named": "always",
    //     "asyncArrow": "always"
    //   }
    // ]
  }
}