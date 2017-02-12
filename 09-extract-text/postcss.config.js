module.exports = {
  plugins: [
    require('precss')({ /* ...options */ }),
    require('autoprefixer')({ /* ...options */ }),
    require('cssnano')({
        mergeRules: true,
        discardDuplicates: true,
        mergeLonghand: true
    })
  ]
}
