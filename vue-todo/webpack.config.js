var path = require('path') 
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js', // 웹펙으로 빌드할파일(이 안에 들어있는 내용들이 웹팩으로 번들링(빌드))
  // output : 웹팩으로 빌드를 하고 난 결과물 파일의 위치와 이름지정
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },

  // module : 웹팩으로 파일들을 빌드 할 때 HTML,CSS,PNG 등의 파일을 자바스크립트로 변환해주는 로더 지정
  module: {
    rules: [
      // 'css-loader'를 적용하여 css파일을 자바스크립트로 변환
      // 변환된 css속성들이 최종적으로 'vue-style-loader'를 거쳐 index.html에 <style>로 삽입
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      

      // vue 파일에 'vue-loader'적용
      // vue 파일에 <style><script><template> 등의 내용이 자바스크립트로 변환되어 웹팩 빌드 결과물에 포함
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },

      // js파일에 'babel-loader' 적용
      // js파일의 ES6문법을 모든 브라우저에서 호환가능한 js로 변환해줌
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      // 이미지 파일들을 'file-loader'를 이용하여 js파일로 변환
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  // 웹팩으로 빌드시 뷰라이브러리의 유형선택
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // vue.esm.js : 최신 웹팩 버전과 사용할 수 있는 full버전의 뷰라이브러리
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  // 웹팩 데브서버 관련 속성 지정
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true // 웹팩으로 빌드시 오류 존재하면 브라우저 화면 전체에 오류 표시
  },

  // 웹팩으로 빌드한 파일의 크키가 250kb넘으면 경고표시 할지 설정
  performance: {
    hints: false
  },

  // 웹팩으로 빌드 된 내용 구동시 개발자도구에서 사용 할 디버깅 방식지정
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
